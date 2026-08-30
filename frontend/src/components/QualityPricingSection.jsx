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
                Crop Price &amp; Category Payout Estimator
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Simulate produce moisture &amp; cleanliness to see instant category allocation &amp; payout estimation.
              </p>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold flex items-center space-x-1.5 border border-amber-200">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Live MSP Rates 2026</span>
            </div>
          </div>

          {/* ESTIMATOR GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* LEFT FORM */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">Select Crop Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CROP_TYPES.map((crop) => (
                    <button
                      key={crop.id}
                      onClick={() => setSelectedCrop(crop)}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${selectedCrop.id === crop.id
                          ? 'border-[#00a86b] bg-emerald-50 text-[#00a86b] shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                      {crop.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Moisture Content (%)</label>
                  <span className="text-xs font-black text-[#00a86b] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">{moisture}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={moisture}
                  onChange={(e) => setMoisture(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00a86b]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                  <span>Dry (Optimal ≤12%)</span>
                  <span>Average (14%)</span>
                  <span>High Moisture (&gt;18%)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Cleanliness &amp; Purity (%)</label>
                  <span className="text-xs font-black text-[#00a86b] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">{purity}%</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="100"
                  value={purity}
                  onChange={(e) => setPurity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00a86b]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                  <span>70% (Industrial)</span>
                  <span>85% (Standard)</span>
                  <span>100% (High Purity)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Quantity (Quintals)</label>
                  <span className="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">{quantity} Qtl ({quantity * 100} kg)</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-[#00a86b] focus:outline-none"
                />
              </div>
            </div>

            {/* RIGHT SUMMARY CARD */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl border border-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Category Payout</span>
                <span className="text-xs font-black bg-[#00a86b] text-white px-3 py-1 rounded-full">
                  Category {assignedGrade}
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
                  <span>Category Adjusted Rate:</span>
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
