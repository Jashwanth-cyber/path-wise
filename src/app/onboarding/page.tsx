'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
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

  
  useEffect(() => {
    if (status === 'loading') return; 

    if (!session?.user?.id) {
      toast.error('Please log in to continue');
      console.log('No valid session found. Redirecting to login.');
      // router.push('/login'); 
      return;
    }
  }, [session, status, router]);

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('onboarding');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed.formData);
      setStep(parsed.step);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('onboarding', JSON.stringify({ formData, step }));
  }, [formData, step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const toggleArray = (
    field: 'secondaryStreams' | 'skills' | 'resources',
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(i => i !== value)
        : [...prev[field], value],
    }));
  };

  const selectSingle = (
    field: 'academicPerformance' | 'careerGoal' | 'timeCommitment',
    value: string
  ) => {
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
      toast.error('Session expired. Redirecting to login...');
      router.push('/login');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Profile saved successfully 🎉');
        localStorage.removeItem('onboarding');
        console.log('Profile saved. Redirecting to assessment...');
        console.log('Profile data:', result.profile);
        // setTimeout(() => {
        //   router.push('/assessment');
        // }, 800);
      } else {
        toast.error(result.error || 'Failed to save profile');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
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

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-orange-50 to-fuchsia-100">
        <p className="text-gray-900 text-lg">Loading...</p>
      </div>
    );
  }

  // If not logged in, the useEffect will redirect, but we show a fallback
  if (!session?.user?.id) {
    return null; // Or a brief message while redirecting
  }

  return (
    <div className="min-h-screen px-3 sm:px-6 lg:px-10 py-6 bg-gradient-to-br from-rose-50 via-orange-50 to-fuchsia-100">
      <div className="lg:flex gap-6">

        {/* Desktop Image */}
        <div className="hidden lg:block w-1/3 rounded-3xl overflow-hidden">
          <img
            src="/onboarding.jpg"
            alt="Onboarding"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-2/3">
          {/* Progress */}
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

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white">
              <h1 className="text-xl font-semibold">Let’s build your profile</h1>
              <p className="text-sm text-rose-100 mt-1">Takes less than 2 minutes</p>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 min-h-[460px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* STEP 1: Basic Information */}
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-sm text-gray-900 focus:outline-none focus:border-rose-500"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={label}>How old are you?</label>
                          <select
                            id="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-sm text-gray-900 focus:outline-none focus:border-rose-500"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-sm text-gray-900 focus:outline-none focus:border-rose-500"
                            placeholder="City / State"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Education */}
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-sm text-gray-900 focus:outline-none focus:border-rose-500"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-sm text-gray-900 focus:outline-none focus:border-rose-500"
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

                  {/* STEP 3: Academic Performance & Skills */}
                  {step === 3 && (
                    <div className="space-y-8">
                      <div>
                        <div className={sectionTitle}>
                          <div className={badge}>3</div>
                          Academic Performance
                        </div>
                        <p className="text-sm text-gray-600 mt-2">What is your average performance?</p>
                        <div className="grid grid-cols-1 gap-3 mt-4">
                          {['Just starting out', 'Average performance', 'Good performance', 'Excellent performance'].map((p) => (
                            <button
                              key={p}
                              onClick={() => selectSingle('academicPerformance', p)}
                              className={optionButton(formData.academicPerformance === p)}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className={sectionTitle}>
                          <div className={badge}>4</div>
                          Current Skills
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Which of these do you already have some experience with?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                          {[
                            'Coding / Programming',
                            'Design tools',
                            'MS Office / Excel',
                            'Communication / Public speaking',
                            'None yet — starting fresh'
                          ].map((skill) => (
                            <button
                              key={skill}
                              onClick={() => toggleArray('skills', skill)}
                              className={`p-4 border rounded-2xl text-left flex justify-between items-center text-gray-900 font-medium transition-all ${
                                formData.skills.includes(skill)
                                  ? 'bg-fuchsia-50 border-fuchsia-500'
                                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
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

                  {/* STEP 4: Career Goal & Time Commitment */}
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
                            <button
                              key={g}
                              onClick={() => selectSingle('careerGoal', g)}
                              className={optionButton(formData.careerGoal === g)}
                            >
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
                            <button
                              key={t}
                              onClick={() => selectSingle('timeCommitment', t)}
                              className={optionButton(formData.timeCommitment === t)}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: Resources, Language & Budget */}
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
                              className={`p-4 border rounded-2xl text-left flex justify-between items-center text-gray-900 font-medium transition-all ${
                                formData.resources.includes(r)
                                  ? 'bg-fuchsia-50 border-fuchsia-500'
                                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
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
                          <select
                            id="languagePreference"
                            value={formData.languagePreference}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-sm text-gray-900 focus:outline-none focus:border-rose-500"
                          >
                            <option>English</option>
                            <option>Telugu</option>
                            <option>Hindi</option>
                          </select>
                        </div>

                        <div>
                          <label className={label}>Are you okay with paid courses?</label>
                          <select
                            id="budgetComfort"
                            value={formData.budgetComfort}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-sm text-gray-900 focus:outline-none focus:border-rose-500"
                          >
                            <option>Yes</option>
                            <option>No</option>
                            <option>Maybe</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-6 bg-gray-50 border-t">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-40 transition-colors"
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
          </div>
        </div>
      </div>
    </div>
  );
}