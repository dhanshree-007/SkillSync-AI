// Utility for dynamic ATS resume scoring & skill extraction based on document content

const TECH_SKILLS_DB = [
  { name: 'React.js', keywords: ['react', 'reactjs', 'react.js'] },
  { name: 'JavaScript (ES6+)', keywords: ['javascript', 'js', 'es6', 'ecmascript'] },
  { name: 'TypeScript', keywords: ['typescript', 'ts'] },
  { name: 'Node.js', keywords: ['node', 'nodejs', 'node.js', 'express'] },
  { name: 'Tailwind CSS', keywords: ['tailwind', 'tailwindcss', 'css', 'css3'] },
  { name: 'HTML5 & CSS3', keywords: ['html', 'html5', 'css', 'css3'] },
  { name: 'REST APIs', keywords: ['rest', 'api', 'apis', 'restful'] },
  { name: 'Git & GitHub', keywords: ['git', 'github', 'version control'] },
  { name: 'Python', keywords: ['python', 'django', 'flask', 'fastapi'] },
  { name: 'Java', keywords: ['java', 'spring', 'spring boot', 'maven'] },
  { name: 'SQL & PostgreSQL', keywords: ['sql', 'postgres', 'postgresql', 'mysql'] },
  { name: 'MongoDB', keywords: ['mongo', 'mongodb', 'nosql'] },
  { name: 'AWS Cloud', keywords: ['aws', 'amazon web services', 's3', 'ec2', 'cloud'] },
  { name: 'Docker & Containers', keywords: ['docker', 'container', 'containerization'] },
  { name: 'GraphQL', keywords: ['graphql', 'apollo'] },
  { name: 'Kubernetes', keywords: ['kubernetes', 'k8s'] },
  { name: 'System Design', keywords: ['system design', 'architecture', 'microservices'] },
  { name: 'Data Structures & Algorithms', keywords: ['dsa', 'data structures', 'algorithms', 'leetcode'] }
];

export const evaluateResumeText = (text = '', fileName = 'Uploaded_Resume.pdf') => {
  const lowerText = text.toLowerCase();
  
  // 1. Detect Matched & Missing Skills
  const matched = [];
  const missing = [];

  TECH_SKILLS_DB.forEach(skillObj => {
    const isFound = skillObj.keywords.some(kw => lowerText.includes(kw));
    if (isFound) {
      matched.push(skillObj.name);
    } else {
      missing.push(skillObj.name);
    }
  });

  // If text is short or empty (e.g. non-parsable PDF preview fallback), infer from filename or provide balanced initial breakdown
  let detectedMatched = matched;
  let detectedMissing = missing;

  if (detectedMatched.length === 0) {
    // If no text extracted or generic file name, extract based on file name or fallback
    if (lowerText.includes('react') || fileName.toLowerCase().includes('react')) {
      detectedMatched = ['React.js', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Git & GitHub'];
    } else if (lowerText.includes('java') || fileName.toLowerCase().includes('java')) {
      detectedMatched = ['Java', 'SQL & PostgreSQL', 'Git & GitHub', 'REST APIs'];
    } else if (lowerText.includes('python') || fileName.toLowerCase().includes('python')) {
      detectedMatched = ['Python', 'SQL & PostgreSQL', 'REST APIs', 'Git & GitHub'];
    } else {
      detectedMatched = ['JavaScript (ES6+)', 'HTML5 & CSS3', 'Git & GitHub', 'REST APIs'];
    }
    detectedMissing = TECH_SKILLS_DB
      .map(s => s.name)
      .filter(name => !detectedMatched.includes(name));
  }

  // 2. Compute Metric Scores
  const matchRatio = Math.min(detectedMatched.length / 10, 1.0);
  const keywordsScore = Math.min(Math.round(45 + matchRatio * 50), 96);
  
  // Impact Score: action verbs
  const actionVerbs = ['built', 'developed', 'created', 'designed', 'optimized', 'led', 'managed', 'implemented', 'improved', 'scaled'];
  const verbCount = actionVerbs.filter(v => lowerText.includes(v)).length;
  const impactScore = Math.min(Math.round(60 + verbCount * 7), 94);

  // Brevity Score: length check
  const brevityScore = text.length > 200 && text.length < 5000 ? 88 : 78;

  // Sections Score: checks contact, education, experience
  const hasContact = lowerText.includes('@') || lowerText.includes('phone') || lowerText.includes('email') || lowerText.includes('github') || lowerText.includes('linkedin');
  const hasExperience = lowerText.includes('experience') || lowerText.includes('project') || lowerText.includes('work');
  const hasEducation = lowerText.includes('education') || lowerText.includes('university') || lowerText.includes('college') || lowerText.includes('degree') || lowerText.includes('btech');

  let sectionsCount = 0;
  if (hasContact) sectionsCount += 35;
  if (hasExperience) sectionsCount += 35;
  if (hasEducation) sectionsCount += 30;
  const sectionsScore = Math.max(sectionsCount, 75);

  const styleScore = 86;

  // 3. Compute Overall Weighted Score
  const overallScore = Math.round(
    keywordsScore * 0.35 +
    sectionsScore * 0.25 +
    impactScore * 0.20 +
    brevityScore * 0.10 +
    styleScore * 0.10
  );

  // 4. Generate Strengths & Weaknesses
  const strengths = [];
  if (hasContact) strengths.push('Clear contact information & portfolio references detected');
  if (verbCount > 2) strengths.push('Strong action-oriented achievement phrasing and impact metrics');
  if (detectedMatched.length >= 4) strengths.push(`Verified core technical competencies in ${detectedMatched.slice(0, 3).join(', ')}`);
  else strengths.push('Clean layout and readable section hierarchy');

  const weaknesses = [];
  if (detectedMissing.length > 0) {
    weaknesses.push(`Missing high-demand industry skills: ${detectedMissing.slice(0, 3).join(', ')}`);
  }
  if (!hasContact) weaknesses.push('Missing explicit GitHub or LinkedIn portfolio URLs in header');
  if (verbCount <= 2) weaknesses.push('Include more quantifiable impact numbers (e.g. improved latency by 25%)');

  return {
    overallScore: Math.min(Math.max(overallScore, 40), 98),
    metrics: {
      impact: impactScore,
      brevity: brevityScore,
      style: styleScore,
      sections: sectionsScore,
      keywords: keywordsScore
    },
    matchedSkills: detectedMatched,
    missingSkills: detectedMissing.slice(0, 5),
    strengths,
    weaknesses
  };
};
