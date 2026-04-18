'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  age: string;
  location: string;
  educationLevel: string;
  stream: string;
  secondaryStreams: string[];
  academicPerformance: string;
  skills: string[];
  careerGoal: string;
  timeCommitment: string;
  resources: string[];
  languagePreference: string;
  budgetComfort: string;
}

export default function PathwiseOnboarding() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    location: '',
    educationLevel: '',
    stream: '',
    secondaryStreams: [],
    academicPerformance: '',
    skills: [],
    careerGoal: '',
    timeCommitment: '',
    resources: [],
    languagePreference: 'English',
    budgetComfort: 'Maybe',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showInitialImage, setShowInitialImage] = useState(true); // Only at very start
  const [isChecking, setIsChecking] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (status === 'loading') return;
    if (!session?.user?.id) {
      toast.error('Please log in to continue');
      router.push('/login');
    }
  }, [session, status, router]);

  // Check if profile already exists
  useEffect(() => {
    const checkProfile = async () => {
      if (!session?.user?.id) return;
      try {
        const res = await fetch(`/api/profile?userId=${session.user.id}`);
        if (!res.ok) throw new Error('Failed to check profile');
        const data = await res.json();
        if (data.exists) {
          router.replace('/dashboard');
        }
      } catch (err) {
        console.error('Failed to check profile:', err);
      } finally {
        setIsChecking(false);
      }
    };

    if (status === 'authenticated' && session?.user?.id) {
      checkProfile();
    }
  }, [session, status, router]);

  // Hide initial image after 2.5 seconds (only once at start)
  useEffect(() => {
    if (!showInitialImage) return;
    const timer = setTimeout(() => setShowInitialImage(false), 2500);
    return () => clearTimeout(timer);
  }, [showInitialImage]);

  // Load saved progress
  useEffect(() => {
    if (isChecking) return;
    const saved = localStorage.getItem('onboarding');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed.formData || formData);
      setStep(Math.min(parsed.step || 1, totalSteps));
    }
  }, [isChecking]);

  // Save progress
  useEffect(() => {
    if (isChecking) return;
    localStorage.setItem('onboarding', JSON.stringify({ formData, step }));
  }, [formData, step, isChecking]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const toggleArray = (field: 'secondaryStreams' | 'skills' | 'resources', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(i => i !== value)
        : [...prev[field], value],
    }));
  };

  const selectSingle = (field: 'academicPerformance' | 'careerGoal' | 'timeCommitment', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (step === 1 && (!formData.name || !formData.age || !formData.location)) return false;
    if (step === 2 && (!formData.educationLevel || !formData.stream)) return false;
    if (step === 3 && !formData.academicPerformance) return false;
    if (step === 4 && (!formData.careerGoal || !formData.timeCommitment)) return false;
    if (step === 5 && formData.resources.length === 0) return false;
    return true;
  };

  const nextStep = () => {
    if (!validate()) return toast.error('Please fill all required fields');
    setStep(s => s + 1);
  };

  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = async () => {
    if (!validate()) return toast.error('Please fill all required fields');
    if (!session?.user?.id) {
      toast.error('Session expired. Redirecting...');
      router.push('/login');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id, ...formData }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        localStorage.removeItem('onboarding');
        toast.success('Profile saved successfully 🎉');
        setTimeout(() => router.push('/dashboard'), 1800);
      } else {
        throw new Error(result.error || 'Failed to save profile');
      }
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
      toast.error(error.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  const label = "text-sm font-semibold text-gray-900 mb-1 block";
  const sectionTitle = "flex items-center gap-2 text-base font-semibold text-gray-900";
  const badge = "w-7 h-7 flex items-center justify-center rounded-lg bg-rose-100 text-rose-600 text-sm font-bold";

  const optionButton = (isSelected: boolean) => `
    w-full p-4 border rounded-2xl text-left text-gray-900 font-medium transition-all
    ${isSelected 
      ? 'bg-rose-50 border-rose-500 shadow-sm' 
      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
    }
  `;

  // Image source logic
  const getImageSrc = () => {
    if (submitStatus === 'success') return '/success.png';
    if (submitStatus === 'error') return '/failure.png';
    return '/fill.jpeg';
  };

  if (status === 'loading' || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-orange-50 to-fuchsia-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-rose-300 border-t-rose-600 rounded-full animate-spin" />
          <p className="mt-4 text-gray-600">Checking your profile...</p>
        </div>
      </div>
    );
  }

  if (!session?.user?.id) return null;

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 bg-gradient-to-br from-rose-50 via-orange-50 to-fuchsia-100">
      <div className="max-w-6xl mx-auto">

        {/* Mobile: Initial Full Screen Image */}
        <AnimatePresence>
          {showInitialImage && submitStatus === 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-50 via-orange-50 to-fuchsia-100"
            >
              <div className="relative w-80 h-80 bg-white rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src={getImageSrc()}
                  alt="Onboarding"
                  className="w-full h-full object-contain p-8"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="lg:flex gap-10 lg:items-start">

          {/* Desktop Side Image - Only at start, success, or error */}
          <div className="hidden lg:block w-5/12 rounded-3xl overflow-hidden h-[620px] flex-shrink-0">
            <AnimatePresence mode="wait">
              {(showInitialImage || submitStatus !== 'idle') && (
                <motion.div
                  key={submitStatus}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex items-center justify-center p-8"
                >
                  <img
                    src={getImageSrc()}
                    alt="Onboarding illustration"
                    className="max-w-full max-h-full object-contain rounded-3xl shadow-lg shadow-rose-500/20"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Progress Bar - Hidden after success */}
            {submitStatus === 'idle' && (
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-700 mb-1">
                  <span>Step {step} of {totalSteps}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-rose-500 to-fuchsia-500"
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[620px]">
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white">
                <h1 className="text-xl font-semibold">
                  {submitStatus === 'success' ? 'Profile Created!' : 'Let’s build your profile'}
                </h1>
                <p className="text-sm text-rose-100 mt-1">
                  {submitStatus === 'success' ? 'Redirecting to dashboard...' : 'Takes less than 2 minutes'}
                </p>
              </div>

              {/* Content */}
              <div className="p-8 flex items-center justify-center min-h-[460px]">
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' ? (
                    // Success Message: "Let's start our journey"
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-6xl">✅</span>
                      </div>
                      <h3 className="text-4xl font-semibold text-gray-900 mb-3">
                        Let's start our journey
                      </h3>
                      <p className="text-gray-600">Your personalized learning path is ready!</p>
                    </motion.div>
                  ) : submitStatus === 'error' ? (
                    <div className="text-center text-red-600">
                      <p className="text-xl font-medium">Something went wrong</p>
                      <p className="mt-2">{errorMessage}</p>
                    </div>
                  ) : (
                    // Form Steps (with darker inputs)
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      className="w-full"
                    >
                      {/* STEP 1 */}
                      {step === 1 && (
                        <div className="space-y-6">
                          <div className={sectionTitle}>
                            <div className={badge}>1</div>
                            Basic Information
                          </div>
                          <div>
                            <label className={label}>What’s your name?</label>
                            <input
                              id="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border-2 border-gray-400 rounded-2xl text-base text-gray-900 focus:outline-none focus:border-rose-600 bg-gray-50"
                              placeholder="Enter your full name"
                            />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className={label}>How old are you?</label>
                              <select
                                id="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-400 rounded-2xl text-base text-gray-900 focus:outline-none focus:border-rose-600 bg-gray-50"
                              >
                                <option value="">Select age</option>
                                {Array.from({ length: 10 }, (_, i) => i + 16).map(n => (
                                  <option key={n} value={n}>{n}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className={label}>Where are you from?</label>
                              <input
                                id="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-400 rounded-2xl text-base text-gray-900 focus:outline-none focus:border-rose-600 bg-gray-50"
                                placeholder="City / State"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* STEP 2 */}
                      {step === 2 && (
                        <div className="space-y-6">
                          <div className={sectionTitle}>
                            <div className={badge}>2</div>
                            Education
                          </div>
                          <div>
                            <label className={label}>What is your current level?</label>
                            <select
                              id="educationLevel"
                              value={formData.educationLevel}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border-2 border-gray-400 rounded-2xl text-base text-gray-900 focus:outline-none focus:border-rose-600 bg-gray-50"
                            >
                              <option value="">Select education level</option>
                              <option>1st Year College</option>
                              <option>2nd Year College</option>
                              <option>3rd Year+</option>
                            </select>
                          </div>
                          <div>
                            <label className={label}>What is your stream?</label>
                            <select
                              id="stream"
                              value={formData.stream}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border-2 border-gray-400 rounded-2xl text-base text-gray-900 focus:outline-none focus:border-rose-600 bg-gray-50"
                            >
                              <option value="">Select your stream</option>
                              <option>Engineering (CSE / IT / ECE / EEE / Mechanical / Civil)</option>
                              <option>Science (Physics / Chemistry / Biology / Maths)</option>
                              <option>Commerce / Business</option>
                              <option>Arts / Humanities</option>
                              <option>Other</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* STEP 3, 4, 5 - Same darker styling applied */}
                      {step === 3 && (
                        <div className="space-y-8">
                          {/* Academic Performance */}
                          <div>
                            <div className={sectionTitle}>
                              <div className={badge}>3</div>
                              Academic Performance
                            </div>
                            <p className="text-sm text-gray-600 mt-2">What is your average performance?</p>
                            <div className="grid grid-cols-1 gap-3 mt-4">
                              {['Just starting out', 'Average performance', 'Good performance', 'Excellent performance'].map((p) => (
                                <button key={p} onClick={() => selectSingle('academicPerformance', p)} className={optionButton(formData.academicPerformance === p)}>
                                  {p}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Skills */}
                          <div>
                            <div className={sectionTitle}>
                              <div className={badge}>4</div>
                              Current Skills
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Which of these do you already have some experience with?</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                              {['Coding / Programming', 'Design tools', 'MS Office / Excel', 'Communication / Public speaking', 'None yet — starting fresh'].map((skill) => (
                                <button
                                  key={skill}
                                  onClick={() => toggleArray('skills', skill)}
                                  className={`p-4 border-2 rounded-2xl text-left flex justify-between items-center text-gray-900 font-medium transition-all ${
                                    formData.skills.includes(skill) ? 'bg-fuchsia-50 border-fuchsia-500' : 'border-gray-400 hover:border-gray-500 hover:bg-gray-50'
                                  }`}
                                >
                                  <span>{skill}</span>
                                  {formData.skills.includes(skill) && <span className="text-fuchsia-600 text-xl">✓</span>}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div className="space-y-8">
                          <div>
                            <div className={sectionTitle}>
                              <div className={badge}>5</div>
                              Career Goal
                            </div>
                            <p className="text-sm text-gray-600 mt-2">What are you aiming for right now?</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                              {['Job', 'Business', 'Higher studies', 'Not sure'].map((g) => (
                                <button key={g} onClick={() => selectSingle('careerGoal', g)} className={optionButton(formData.careerGoal === g)}>
                                  {g}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className={sectionTitle}>
                              <div className={badge}>6</div>
                              Time Commitment
                            </div>
                            <p className="text-sm text-gray-600 mt-2">How much time can you spend daily?</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                              {['Less than 1 hour', '1–2 hours', '2–4 hours', '4+ hours'].map((t) => (
                                <button key={t} onClick={() => selectSingle('timeCommitment', t)} className={optionButton(formData.timeCommitment === t)}>
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 5 && (
                        <div className="space-y-8">
                          <div>
                            <div className={sectionTitle}>
                              <div className={badge}>7</div>
                              Resources
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Do you have access to these?</p>
                            <div className="grid grid-cols-1 gap-3 mt-4">
                              {['Laptop', 'Smartphone', 'Internet'].map((r) => (
                                <button
                                  key={r}
                                  onClick={() => toggleArray('resources', r)}
                                  className={`p-4 border-2 rounded-2xl text-left flex justify-between items-center text-gray-900 font-medium transition-all ${
                                    formData.resources.includes(r) ? 'bg-fuchsia-50 border-fuchsia-500' : 'border-gray-400 hover:border-gray-500'
                                  }`}
                                >
                                  <span>{r}</span>
                                  {formData.resources.includes(r) && <span className="text-fuchsia-600 text-xl">✓</span>}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className={label}>Preferred language?</label>
                              <select id="languagePreference" value={formData.languagePreference} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-400 rounded-2xl text-base text-gray-900 focus:outline-none focus:border-rose-600 bg-gray-50">
                                <option>English</option>
                                <option>Telugu</option>
                                <option>Hindi</option>
                              </select>
                            </div>
                            <div>
                              <label className={label}>Are you okay with paid courses?</label>
                              <select id="budgetComfort" value={formData.budgetComfort} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-400 rounded-2xl text-base text-gray-900 focus:outline-none focus:border-rose-600 bg-gray-50">
                                <option>Yes</option>
                                <option>No</option>
                                <option>Maybe</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation - Only show during form filling */}
              {submitStatus === 'idle' && (
                <div className="flex justify-between items-center p-6 bg-gray-50 border-t">
                  <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-40"
                  >
                    ← Back
                  </button>

                  {step < totalSteps ? (
                    <button
                      onClick={nextStep}
                      className="px-8 py-2.5 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white text-sm font-semibold rounded-2xl hover:shadow-md transition-all"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-8 py-2.5 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white text-sm font-semibold rounded-2xl hover:shadow-md transition-all disabled:opacity-70"
                    >
                      {isSubmitting ? 'Saving...' : 'Save Profile'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}