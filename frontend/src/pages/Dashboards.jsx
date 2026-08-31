import React, { useState } from 'react';
import { Sprout, Users, Building2, Scale, ArrowLeft, CheckCircle2, ShieldCheck, FileCheck, IndianRupee, Bell, LogOut, Award, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import VolunteerDashboard from './VolunteerDashboard';
import CenterInChargeDashboard from './CenterInChargeDashboard';
import HeadOfficeDashboard from './HeadOfficeDashboard';

export const Dashboards = () => {
  const { currentView, userSession, navigateTo, showToast } = useApp();

  const sessionRole = userSession?.role || userSession?.category;

  // 1. Explicit view route takes highest priority!
  if (currentView === 'dashboard-volunteer') {
    return <VolunteerDashboard />;
  }
  if (currentView === 'dashboard-center') {
    return <CenterInChargeDashboard />;
  }
  if (currentView === 'dashboard-headoffice') {
    return <HeadOfficeDashboard />;
  }

  // 2. Otherwise fall back to userSession role
  if (sessionRole === 'Volunteer') {
    return <VolunteerDashboard />;
  }
  if (sessionRole === 'Center in Charge' || sessionRole === 'Center In-Charge' || sessionRole === 'Center') {
    return <CenterInChargeDashboard />;
  }
  if (sessionRole === 'Head Office' || sessionRole === 'HeadOffice') {
    return <HeadOfficeDashboard />;
  }

  // Default fallback
  return <VolunteerDashboard />;
};

export default Dashboards;

