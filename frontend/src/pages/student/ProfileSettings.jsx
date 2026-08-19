import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useToast } from '../../components/common/Toast';
import { useAuth } from '../../context/AuthContext';
import { 
  User, X, Plus, Sparkles, Save, Camera, Trash2, 
  Pencil, Phone, GraduationCap, Mail, ShieldCheck, CheckCircle2, ArrowLeft 
} from 'lucide-react';
import api from '../../services/api';

const PROFILE_STORAGE_KEY = 'skillsync_student_profile';
const DEFAULT_SKILLS = ['React.js', 'JavaScript (ES6+)', 'Node.js', 'Tailwind CSS'];

export default function ProfileSettings() {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(localStorage.getItem('skillsync_profile_pic') || null);
  const [lastSaved, setLastSaved] = useState(null);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Dhanshree Saini',
    phone: '6284818723',
    university: 'Lovely Professional University',
  });

  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [newSkill, setNewSkill] = useState('');

  // Load stored profile on mount
  useEffect(() => {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFormData({
          fullName: parsed.fullName || user?.fullName || 'Dhanshree Saini',
          phone: parsed.phone || '6284818723',
          university: parsed.university || 'Lovely Professional University',
        });
        if (parsed.skills && parsed.skills.length > 0) {
          setSkills(parsed.skills);
        }
        if (parsed.lastSaved) {
          setLastSaved(parsed.lastSaved);
        }
      } catch (e) {
        console.warn('Could not parse stored profile:', e);
      }
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast('Profile picture must be smaller than 5MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        setProfileImage(dataUrl);
        localStorage.setItem('skillsync_profile_pic', dataUrl);
        window.dispatchEvent(new Event('storage'));
        addToast('Profile picture updated successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem('skillsync_profile_pic');
    window.dispatchEvent(new Event('storage'));
    addToast('Profile picture removed', 'info');
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const profileToSave = {
      ...formData,
      skills: skills.length > 0 ? skills : DEFAULT_SKILLS,
      email: user?.email || 'dhanshreesaini7877@gmail.com',
      lastSaved: `Saved at ${nowStr}`
    };

    try {
      // 1. Save to Local Storage
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileToSave));
      
      // 2. Update Auth Context user
      if (updateUser) {
        updateUser({
          fullName: profileToSave.fullName,
          phone: profileToSave.phone,
          university: profileToSave.university
        });
      }

      // 3. Send API update
      await api.put('/student/profile', profileToSave).catch(() => {});

      setLastSaved(profileToSave.lastSaved);
      addToast('Profile changes saved successfully!', 'success');
      
      // Automatically switch back to View Mode after saving
      setIsEditMode(false);
    } catch (err) {
      setLastSaved(`Saved locally at ${nowStr}`);
      addToast('Profile saved locally!', 'success');
      setIsEditMode(false);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = (e) => {
    if (e) e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updated = [...skills, newSkill.trim()];
      setSkills(updated);
      setNewSkill('');
      addToast(`Added skill "${newSkill.trim()}"`, 'success');
    }
  };

  const removeSkill = (skillToRemove) => {
    const updated = skills.filter(s => s !== skillToRemove);
    setSkills(updated.length > 0 ? updated : DEFAULT_SKILLS);
    addToast(`Removed "${skillToRemove}"`, 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-[#0B1120] text-slate-100 p-2 sm:p-4 rounded-2xl">
      
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-white flex items-center gap-2">
            <User className="w-7 h-7 text-cyan-400" />
            Candidate Profile <span className="text-neural-gradient">{isEditMode ? 'Editor' : 'Overview'}</span>
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            {isEditMode 
              ? "Update your personal details, avatar photo, and verified technical skill stack." 
              : "Read-only view of your candidate profile, academic details, and verified skills."
            }
          </p>
        </div>

        <div className="flex items-center gap-3">
          {lastSaved && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{lastSaved}</span>
            </div>
          )}

          {!isEditMode ? (
            <Button 
              onClick={() => setIsEditMode(true)} 
              className="btn-primary text-xs font-bold px-4 h-10 text-white flex items-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            >
              <Pencil className="w-4 h-4" /> Edit Profile
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setIsEditMode(false)} 
              className="border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-bold px-4 h-10 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Cancel
            </Button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: READ-ONLY VIEW MODE (Default)                                     */}
      {/* ========================================================================= */}
      {!isEditMode ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* View Left Card: Avatar & Primary Info */}
          <div className="md:col-span-1">
            <Card className="neural-glass-card bg-[#0F172A] border border-slate-800 rounded-2xl text-center p-6 flex flex-col items-center shadow-xl">
              <CardContent className="flex flex-col items-center p-0 w-full">
                
                {/* Profile Photo Avatar */}
                <div className="w-28 h-28 rounded-full overflow-hidden bg-neural-gradient flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.5)] border-4 border-slate-800 mb-4">
                  {profileImage ? (
                    <img src={profileImage} alt="Candidate Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-14 w-14 text-white" />
                  )}
                </div>

                {/* Candidate Name */}
                <h3 className="font-extrabold text-xl text-white">{formData.fullName || 'Dhanshree Saini'}</h3>
                
                {/* Candidate Email */}
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  {user?.email || 'dhanshreesaini7877@gmail.com'}
                </p>

                {/* Role Badge */}
                <div className="mt-4 px-3.5 py-1 bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-extrabold tracking-wider">
                  ROLE: {user?.role || 'STUDENT'}
                </div>

              </CardContent>
            </Card>
          </div>

          {/* View Right Card: Contact, Academic & Read-Only Skill Tags */}
          <div className="md:col-span-2 space-y-6">
            <Card className="neural-glass-card bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl relative">
              
              {/* Card Header with Edit Trigger */}
              <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-extrabold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" /> Verified Candidate Profile
                </CardTitle>
                
                <button 
                  onClick={() => setIsEditMode(true)}
                  className="text-xs text-cyan-400 hover:text-white font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit Profile
                </button>
              </CardHeader>

              <CardContent className="p-0 space-y-6">
                
                {/* Read-only Data Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#0B1120] border border-slate-800">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Full Name</span>
                    <span className="text-sm font-bold text-white block">{formData.fullName}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B1120] border border-slate-800">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Phone Number</span>
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <Phone className="w-4 h-4 text-cyan-400" />
                      {formData.phone || 'Not specified'}
                    </span>
                  </div>

                  <div className="sm:col-span-2 p-4 rounded-xl bg-[#0B1120] border border-slate-800">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">University / Institute</span>
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-cyan-400" />
                      {formData.university || 'Not specified'}
                    </span>
                  </div>
                </div>

                {/* Read-Only Skill Stack Tags (No Delete 'x' Icons) */}
                <div className="pt-4 border-t border-slate-800">
                  <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider block mb-3">
                    Verified Skill Stack ({skills.length})
                  </span>
                  
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span key={index} className="skill-matched text-xs font-bold py-1 px-3">
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

        </div>
      ) : (
        /* ========================================================================= */
        /* MODE 2: EDIT MODE (Opens on clicking "Edit Profile")                      */
        /* ========================================================================= */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Edit Left Card: Photo Upload & Delete Controls */}
          <div className="md:col-span-1">
            <Card className="neural-glass-card bg-[#0F172A] border border-slate-800 rounded-2xl text-center p-6 flex flex-col items-center">
              <CardContent className="flex flex-col items-center p-0 w-full">
                
                <div className="relative group mb-4">
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-neural-gradient flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.5)] border-4 border-slate-800 relative">
                    {profileImage ? (
                      <img src={profileImage} alt="Candidate Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-14 w-14 text-white" />
                    )}

                    <label 
                      htmlFor="avatar-upload" 
                      className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity duration-300 backdrop-blur-xs"
                    >
                      <Camera className="w-6 h-6 mb-1 text-cyan-400" />
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Change</span>
                    </label>
                  </div>
                </div>

                <input 
                  type="file" 
                  id="avatar-upload" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />

                <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
                  <label 
                    htmlFor="avatar-upload" 
                    className="cursor-pointer inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/25 transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5 mr-1.5 text-cyan-400" /> Upload Photo
                  </label>

                  {profileImage && (
                    <button 
                      type="button" 
                      onClick={handleRemoveImage}
                      className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25 transition-colors"
                      title="Remove profile picture"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1 text-rose-400" /> Delete
                    </button>
                  )}
                </div>

                <h3 className="font-extrabold text-lg text-white">{formData.fullName || 'Dhanshree Saini'}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{user?.email || 'dhanshreesaini7877@gmail.com'}</p>
                
                <div className="mt-4 px-3 py-1 bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-extrabold tracking-wider">
                  ROLE: {user?.role || 'STUDENT'}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Edit Right Card: Editable Form Controls */}
          <div className="md:col-span-2 space-y-6">
            <Card className="neural-glass-card bg-[#0F172A] border border-slate-800 rounded-2xl p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-base font-extrabold text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" /> Edit Personal & Academic Information
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        className="input-field bg-[#0B1120] border-slate-800 text-white" 
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <input 
                        type="text" 
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="input-field bg-[#0B1120] border-slate-800 text-white" 
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-1.5">University / Institute</label>
                      <input 
                        type="text" 
                        value={formData.university}
                        onChange={(e) => handleChange('university', e.target.value)}
                        placeholder="e.g. Lovely Professional University"
                        className="input-field bg-[#0B1120] border-slate-800 text-white" 
                      />
                    </div>
                  </div>

                  {/* Editable Skill Stack Section with Removable 'x' Tags */}
                  <div className="pt-4 border-t border-slate-800 mt-4">
                    <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-3">Verified Skill Stack</label>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {skills.map((skill, index) => (
                        <span key={index} className="skill-matched text-xs font-bold flex items-center gap-1.5">
                          ✓ {skill}
                          <button 
                            type="button" 
                            onClick={() => removeSkill(skill)} 
                            className="ml-1 text-rose-400 hover:text-rose-300"
                            title={`Remove ${skill}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addSkill(e)}
                        placeholder="Add technical skill (e.g. Python, Java, Docker)" 
                        className="input-field bg-[#0B1120] border-slate-800 text-white flex-1" 
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={addSkill} 
                        className="border-slate-800 text-cyan-400 hover:bg-cyan-500/10"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Form Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4">
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => setIsEditMode(false)}
                      className="border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-bold px-5 h-10"
                    >
                      Cancel
                    </Button>

                    <Button 
                      type="submit" 
                      isLoading={loading} 
                      className="btn-primary text-xs font-bold px-6 h-10 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                    >
                      <Save className="w-4 h-4 mr-2" /> Save Profile Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      )}
    </div>
  );
}
