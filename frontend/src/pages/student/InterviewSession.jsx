import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  Mic, MicOff, Volume2, VolumeX, StopCircle, 
  Sparkles, CheckCircle2, RotateCcw, ArrowRight, User, Radio, HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../../components/common/Toast';

export default function InterviewSession() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const role = state?.config?.role || 'Software Engineer';
  const type = state?.config?.type || 'Technical';
  const maxQuestions = state?.config?.questionCount || 5;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = [
    `Welcome! I am your AI Interviewer. We are conducting a ${type} interview for the position of ${role}. To begin, please introduce yourself and walk me through your background.`,
    `Great! Can you explain the core concepts of asynchronous programming and how event loops work?`,
    `How do you handle performance optimization in high-traffic web applications?`,
    `Tell me about a challenging technical problem you solved recently and your approach.`,
    `Thank you! What strategies do you use for technical decision-making under tight deadlines?`
  ];

  const [aiState, setAiState] = useState('SPEAKING');
  const [transcript, setTranscript] = useState('');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const speakQuestion = (text) => {
    if (!isAudioEnabled) {
      setAiState('LISTENING');
      startSpeechRecognition();
      return;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
      if (preferredVoice) utterance.voice = preferredVoice;

      setAiState('SPEAKING');

      utterance.onend = () => {
        setAiState('LISTENING');
        startSpeechRecognition();
      };

      utterance.onerror = () => {
        setAiState('LISTENING');
        startSpeechRecognition();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setAiState('LISTENING');
      startSpeechRecognition();
    }
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && !isMicMuted) {
      try {
        if (recognitionRef.current) recognitionRef.current.stop();
        
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);

          const lower = currentTranscript.toLowerCase();
          if (
            lower.includes('can you repeat') || 
            lower.includes('repeat the question') || 
            lower.includes('please repeat') ||
            lower.includes('pardon me')
          ) {
            stopSpeechRecognition();
            handleRepeatQuestion();
          }
        };

        recognition.onerror = (err) => {
          console.warn('Speech recognition notice:', err);
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch (e) {
        console.warn('Recognition setup error:', e);
      }
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
  };

  useEffect(() => {
    speakQuestion(questions[currentQuestionIndex]);
    setTranscript('');
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      stopSpeechRecognition();
    };
  }, [currentQuestionIndex]);

  const handleNextQuestion = () => {
    stopSpeechRecognition();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();

    setUserAnswers(prev => [...prev, { question: questions[currentQuestionIndex], answer: transcript || 'No answer recorded.' }]);
    
    setAiState('THINKING');

    setTimeout(() => {
      if (currentQuestionIndex + 1 >= maxQuestions) {
        addToast('Interview completed! Generating feedback report...', 'success');
        navigate('/student/interview/results', { state: { answers: userAnswers, config: state?.config } });
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 1000);
  };

  const handleRepeatQuestion = () => {
    stopSpeechRecognition();
    addToast('AI Interviewer repeating the question...', 'info');

    const repeatPhrase = "No problem at all! Let me repeat the question for you. " + questions[currentQuestionIndex];
    speakQuestion(repeatPhrase);
  };

  const toggleMic = () => {
    if (isMicMuted) {
      setIsMicMuted(false);
      startSpeechRecognition();
      addToast('Microphone unmuted', 'info');
    } else {
      setIsMicMuted(true);
      stopSpeechRecognition();
      addToast('Microphone muted', 'info');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 neural-glass-card p-4 rounded-2xl border border-slate-800/80 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
            <Radio className="w-5 h-5 animate-pulse text-cyan-400" />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
              Live AI Voice Interview Room
              <span className="text-xs px-2.5 py-0.5 bg-cyan-500/15 text-cyan-400 rounded-full font-bold border border-cyan-500/30">
                {type}
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-semibold">Target Role: {role}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Duration</span>
            <span className="font-mono font-extrabold text-cyan-400">{formatTime(secondsElapsed)}</span>
          </div>

          <div className="text-right px-4 border-l border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Question</span>
            <span className="font-bold text-white">{currentQuestionIndex + 1} / {maxQuestions}</span>
          </div>

          <Button 
            variant="outline" 
            className="text-rose-400 border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-xs px-3 h-9 font-bold" 
            onClick={() => navigate('/student/interview/results')}
          >
            <StopCircle className="w-4 h-4 mr-1" /> End Early
          </Button>
        </div>
      </div>

      {/* Main Video Call Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card: AI Interviewer Stage */}
        <Card className="relative overflow-hidden bg-[#0F172A] text-white border border-slate-800/80 rounded-2xl flex flex-col justify-between min-h-[450px] shadow-2xl">
          <div className={`absolute inset-0 bg-gradient-to-b ${
            aiState === 'SPEAKING' ? 'from-brand-600/25 via-[#0F172A]/60 to-[#0F172A]' :
            aiState === 'LISTENING' ? 'from-cyan-600/20 via-[#0F172A]/60 to-[#0F172A]' :
            'from-amber-600/20 via-[#0F172A]/60 to-[#0F172A]'
          } transition-colors duration-700 pointer-events-none`} />

          <div className="p-4 flex justify-between items-center relative z-10">
            <div className="flex items-center gap-2 bg-[#0B1120]/80 px-3 py-1.5 rounded-full border border-slate-800">
              <span className={`w-2.5 h-2.5 rounded-full ${
                aiState === 'SPEAKING' ? 'bg-cyan-400 animate-ping' :
                aiState === 'LISTENING' ? 'bg-emerald-400 animate-pulse' :
                'bg-amber-400 animate-bounce'
              }`} />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {aiState === 'SPEAKING' && 'AI Interviewer Speaking...'}
                {aiState === 'LISTENING' && 'Listening To Candidate...'}
                {aiState === 'THINKING' && 'Evaluating Response...'}
              </span>
            </div>

            <button 
              onClick={() => setIsAudioEnabled(!isAudioEnabled)} 
              className="p-2 rounded-xl bg-[#0B1120] text-slate-300 hover:text-white transition-colors border border-slate-800"
              title={isAudioEnabled ? "Mute AI Voice" : "Enable AI Voice"}
            >
              {isAudioEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
            </button>
          </div>

          <div className="flex flex-col items-center justify-center my-6 relative z-10">
            <div className="relative">
              {aiState === 'SPEAKING' && (
                <>
                  <motion.div 
                    animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.1, 0.6] }} 
                    transition={{ repeat: Infinity, duration: 1.4 }}
                    className="absolute -inset-4 rounded-full border-2 border-cyan-400/40" 
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }} 
                    transition={{ repeat: Infinity, duration: 1.8, delay: 0.2 }}
                    className="absolute -inset-8 rounded-full border border-brand-500/30" 
                  />
                </>
              )}

              <div className="w-32 h-32 rounded-full bg-neural-gradient flex items-center justify-center shadow-[0_0_35px_rgba(99,102,241,0.6)] border-4 border-slate-800">
                <Sparkles className="w-14 h-14 text-white" />
              </div>
            </div>

            <h3 className="mt-4 font-extrabold text-lg text-white">AI Executive Interviewer</h3>
            <p className="text-xs text-slate-400">SkillSync AI Technical Panel</p>

            <div className="flex items-center gap-1.5 mt-6 h-8">
              {[40, 70, 30, 90, 50, 80, 40, 65, 85, 30, 75].map((val, idx) => (
                <motion.div
                  key={idx}
                  animate={aiState === 'SPEAKING' ? { height: [`${(val % 30) + 15}%`, `${val}%`, `${(val % 30) + 15}%`] } : { height: '15%' }}
                  transition={{ repeat: Infinity, duration: 0.5 + (idx % 4) * 0.12 }}
                  className={`w-1.5 rounded-full ${aiState === 'SPEAKING' ? 'bg-cyan-400' : 'bg-slate-800'}`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 bg-[#0B1120]/90 backdrop-blur border-t border-slate-800 relative z-10 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Interviewer Question:</span>
              <button 
                onClick={handleRepeatQuestion}
                className="text-xs text-cyan-300 hover:text-white flex items-center gap-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 px-2.5 py-1 rounded-lg border border-cyan-500/30 transition-colors font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Can You Repeat?
              </button>
            </div>
            <p className="text-sm font-semibold text-slate-100 leading-relaxed">
              "{questions[currentQuestionIndex]}"
            </p>
          </div>
        </Card>

        {/* Right Card: Candidate Live Voice Interface */}
        <Card className="neural-glass-card border border-slate-800/80 rounded-2xl flex flex-col justify-between min-h-[450px] shadow-2xl">
          <div>
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-400" />
                <h3 className="font-extrabold text-sm text-white">Candidate Spoken Response</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${
                  !isMicMuted && aiState === 'LISTENING' 
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  <Mic className="w-3 h-3" />
                  {!isMicMuted && aiState === 'LISTENING' ? 'Live Mic Active' : 'Mic Off'}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Live Voice Transcript (Speak into your Microphone):
              </label>
              
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder={
                  aiState === 'SPEAKING' 
                    ? "AI is speaking... Listen out loud. Microphones automatically open as soon as AI finishes asking!" 
                    : "Speak out loud now... Say 'Can you repeat?' to hear the question again, or answer out loud!"
                }
                rows={8}
                className="w-full input-field p-4 text-sm leading-relaxed focus:ring-cyan-500 bg-[#0B1120] border-slate-800 text-slate-100 resize-none rounded-xl"
              />

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>💬 Say <i>"Can you repeat?"</i> or click the repeat button anytime if you missed the question!</span>
                <span className="font-mono text-slate-400">{transcript.length} chars</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-800 bg-[#0B1120] flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                onClick={toggleMic}
                className={`h-10 px-4 font-bold text-xs ${isMicMuted ? 'border-rose-500 text-rose-400 bg-rose-500/10' : 'border-slate-800 text-slate-300'}`}
              >
                {isMicMuted ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2 text-emerald-400" />}
                {isMicMuted ? 'Unmute' : 'Mute'}
              </Button>

              <button
                onClick={handleRepeatQuestion}
                className="h-10 px-3.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 transition-colors flex items-center gap-1.5"
                title="Ask AI Interviewer to repeat the question"
              >
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Ask to Repeat</span>
              </button>
            </div>

            <Button 
              onClick={handleNextQuestion} 
              disabled={aiState === 'THINKING'}
              className="btn-primary h-10 px-6 text-xs font-bold"
            >
              {currentQuestionIndex + 1 >= maxQuestions ? (
                <>Submit & Finish <CheckCircle2 className="w-4 h-4 ml-2" /></>
              ) : (
                <>Submit Answer & Next <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
}
