import React, { useState } from 'react';
import { Award, CheckCircle2, AlertCircle, Scale, Calculator, ArrowRight, Info, Percent, DollarSign, Sparkles } from 'lucide-react';
import { QUALITY_GRADES, CROP_TYPES } from '../data/mockData';

export const QualityPricingSection = () => {
  // Interactive Price Calculator state
  const [selectedCrop, setSelectedCrop] = useState(CROP_TYPES[0]);
  const [quantity, setQuantity] = useState(50); // Quintals
  const [moisture, setMoisture] = useState(11.5); // %
  const [cleanliness, setCleanliness] = useState(98); // %

  // Dynamic Grade & Payout Calculation
  const calculateGrade = () => {
    if (moisture <= 12 && cleanliness >= 95) {
      return { grade: 'A', tag: 'Grade A (Premium)', multiplier: selectedCrop.gradeAMultiplier, color: 'text-emerald-700 bg-emerald-100 border-emerald-300' };
    } else if (moisture <= 14.5 && cleanliness >= 75) {
      return { grade: 'B', tag: 'Grade B (Standard MSP)', multiplier: selectedCrop.gradeBMultiplier, color: 'text-amber-800 bg-amber-100 border-amber-300' };
    } else {
      return { grade: 'C', tag: 'Grade C (Secondary Processing)', multiplier: selectedCrop.gradeCMultiplier, color: 'text-orange-800 bg-orange-100 border-orange-300' };
    }
  };

  const calculatedGradeInfo = calculateGrade();
  const estimatedPricePerQtl = Math.round(selectedCrop.basePrice * calculatedGradeInfo.multiplier);
  const totalPayout = (estimatedPricePerQtl * quantity).toLocaleString('en-IN');

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden">

      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-300">
            <Award className="w-3.5 h-3.5" />
            <span>Capacity-Based Center Allocation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Real-Time Center Capacity Management
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            A, B, and C represent Collection Center availability &amp; real-time storage capacity — NOT crop quality.
          </p>
        </div>

        {/* 3 Collection Center Capacity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              category: 'A',
              title: 'A CENTER',
              subtitle: 'Priority Collection Center',
              capacity: '5,000 kg',
              currentStock: '3,800 kg',
              available: '1,200 kg',
              fillPercentage: 76,
              status: 'AVAILABLE',
              badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
              progressColor: 'bg-emerald-500',
              headerGradient: 'from-emerald-700 to-emerald-900',
              priorityText: '1st Priority (Primary target)'
            },
            {
              category: 'B',
              title: 'B CENTER',
              subtitle: 'Secondary Collection Center',
              capacity: '5,000 kg',
              currentStock: '4,700 kg',
              available: '300 kg',
              fillPercentage: 94,
              status: 'LIMITED',
              badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
              progressColor: 'bg-amber-500',
              headerGradient: 'from-amber-600 to-amber-800',
              priorityText: '2nd Priority (Used when A is full)'
            },
            {
              category: 'C',
              title: 'C CENTER',
              subtitle: 'Overflow Collection Center',
              capacity: '5,000 kg',
              currentStock: '5,000 kg',
              available: '0 kg',
              fillPercentage: 100,
              status: 'FULL',
              badgeColor: 'bg-red-100 text-red-800 border-red-300',
              progressColor: 'bg-red-500',
              headerGradient: 'from-red-600 to-red-800',
              priorityText: '3rd Priority (Used when A & B full)'
            }
          ].map((centerCard) => (
            <div
              key={centerCard.category}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200/90 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Header Banner */}
                <div className={`p-6 text-white bg-gradient-to-r ${centerCard.headerGradient}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs">
                      {centerCard.subtitle}
                    </span>
                    <span className="text-3xl font-black">{centerCard.title}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mt-1">{centerCard.status}</h3>
                  <p className="text-xs font-semibold text-white/90 mt-1">{centerCard.priorityText}</p>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Capacity Utilization</span>
                      <span className="text-slate-900 font-extrabold">{centerCard.fillPercentage}% Full</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className={`h-full ${centerCard.progressColor} rounded-full transition-all duration-500`}
                        style={{ width: `${centerCard.fillPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Capacity</span>
                      <span className="font-extrabold text-slate-800">{centerCard.capacity}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Current</span>
                      <span className="font-extrabold text-slate-800">{centerCard.currentStock}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Available</span>
                      <span className="font-extrabold text-emerald-700">{centerCard.available}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Tag */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500">Allocation Status:</span>
                <span className={`px-3 py-1 rounded-lg border text-xs font-black ${centerCard.badgeColor}`}>
                  {centerCard.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* INTERACTIVE CROP PRICE & QUALITY ESTIMATOR TOOL */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-emerald-100 relative overflow-hidden">

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
                <Calculator className="w-4 h-4" />
                <span>Interactive Farmer Tool</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Crop Price &amp; Quality Payout Estimator
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Simulate produce moisture &amp; cleanliness to see instant grade categorization &amp; DBT payout estimation.
              </p>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold flex items-center space-x-1.5 border border-amber-200">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Live MSP Rates 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">

              {/* Select Crop */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Select Crop Produce:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {CROP_TYPES.map((crop) => (
                    <button
                      key={crop.id}
                      onClick={() => setSelectedCrop(crop)}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${selectedCrop.id === crop.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100'
                        }`}
                    >
                      <div>{crop.name}</div>
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                        Base: ₹{crop.basePrice}/{crop.unit}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">

                {/* Quantity */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-700">Quantity</span>
                    <span className="text-xs font-extrabold text-emerald-700">{quantity} Qtl</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="300"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400">Total weight in quintals</span>
                </div>

                {/* Moisture */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-700">Moisture %</span>
                    <span className={`text-xs font-extrabold ${moisture <= 12 ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {moisture}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="22"
                    step="0.5"
                    value={moisture}
                    onChange={(e) => setMoisture(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400">Optimal: &lt; 12%</span>
                </div>

                {/* Cleanliness */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-700">Cleanliness %</span>
                    <span className="text-xs font-extrabold text-emerald-700">{cleanliness}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="100"
                    value={cleanliness}
                    onChange={(e) => setCleanliness(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400">Foreign matter cut</span>
                </div>

              </div>

            </div>

            {/* Live Calculation Output Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 sm:p-7 rounded-3xl shadow-lg border border-slate-800 space-y-5">

              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Calculated Result
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${calculatedGradeInfo.color}`}>
                  {calculatedGradeInfo.tag}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Selected Produce:</span>
                  <span className="font-bold text-white">{selectedCrop.name}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Government Base MSP:</span>
                  <span className="font-bold text-white">₹{selectedCrop.basePrice} / Qtl</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Quality Adjusted Rate:</span>
                  <span className="font-bold text-amber-300">₹{estimatedPricePerQtl} / Qtl</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Quantity Weight:</span>
                  <span className="font-bold text-white">{quantity} Quintals</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 bg-emerald-900/40 rounded-2xl p-4 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-1">
                  Estimated Farmer Direct Payout (DBT)
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                  ₹{totalPayout}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Direct transfer into linked Aadhaar bank account within 24 hours
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
