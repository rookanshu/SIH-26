"use client";

import React from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { LandingModal } from "@/components/layout/LandingModal";
import { LoginModal } from "@/components/modals/LoginModal";
import { IdentityVerificationModal } from "@/components/modals/IdentityVerificationModal";
import { AiCopilotModal } from "@/components/modals/AiCopilotModal";
import { DriverHudView } from "@/components/views/DriverHudView";

// Views
import { OverviewView } from "@/components/views/OverviewView";
import { LiveMapView } from "@/components/views/LiveMapView";
import { RoutesView } from "@/components/views/RoutesView";
import { VehiclesView } from "@/components/views/VehiclesView";
import { ShipmentsView } from "@/components/views/ShipmentsView";
import { AccessibilityView } from "@/components/views/AccessibilityView";
import { AlertsView } from "@/components/views/AlertsView";
import { WeatherView } from "@/components/views/WeatherView";
import { FieldReportsView } from "@/components/views/FieldReportsView";
import { EmergencyOpsView } from "@/components/views/EmergencyOpsView";
import { AnalyticsView } from "@/components/views/AnalyticsView";
import { ProfileView } from "@/components/views/ProfileView";

import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";

function MainContent() {
  const {
    activeTab,
    isDriverHudOpen,
    notification,
    dismissNotification,
  } = useApp();

  // Render view based on active navigation tab
  const renderActiveView = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewView />;
      case "map":
        return <LiveMapView />;
      case "routes":
        return <RoutesView />;
      case "vehicles":
        return <VehiclesView />;
      case "shipments":
        return <ShipmentsView />;
      case "accessibility":
        return <AccessibilityView />;
      case "alerts":
        return <AlertsView />;
      case "weather":
        return <WeatherView />;
      case "field-reports":
        return <FieldReportsView />;
      case "emergency":
        return <EmergencyOpsView />;
      case "analytics":
        return <AnalyticsView />;
      case "profile":
        return <ProfileView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Global Application Header */}
      <Header />

      {/* Body: Sidebar + Main Dynamic View */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        <Sidebar />

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative pb-14 md:pb-0">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Persistent Navigation */}
      <MobileNav />

      {/* Modals & Overlays */}
      <LandingModal />
      <LoginModal />
      <IdentityVerificationModal />
      <AiCopilotModal />
      {isDriverHudOpen && <DriverHudView />}

      {/* System Toast Notification */}
      {notification && (
        <div className="fixed bottom-16 md:bottom-4 right-4 z-50 max-w-sm w-full animate-in slide-in-from-bottom-2 duration-200">
          <div
            className={`p-3.5 rounded-xl border shadow-2xl flex items-start gap-3 backdrop-blur-md ${
              notification.type === "success"
                ? "bg-emerald-950/95 border-emerald-600 text-emerald-100"
                : notification.type === "warning"
                ? "bg-amber-950/95 border-amber-600 text-amber-100"
                : notification.type === "error"
                ? "bg-red-950/95 border-red-600 text-red-100"
                : "bg-slate-900/95 border-sky-600 text-slate-100"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {notification.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : notification.type === "warning" ? (
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              ) : notification.type === "error" ? (
                <XCircle className="w-4 h-4 text-red-400" />
              ) : (
                <Info className="w-4 h-4 text-sky-400" />
              )}
            </div>

            <div className="flex-1 min-w-0 text-xs">
              <div className="font-bold tracking-tight">{notification.title}</div>
              <div className="text-[11px] opacity-90 mt-0.5 leading-snug">
                {notification.message}
              </div>
            </div>

            <button
              onClick={dismissNotification}
              className="p-1 rounded hover:bg-black/30 opacity-75 hover:opacity-100 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
