"use client";

import { useState } from "react";
import { AppSidebar } from "./dashboard-components/app-sidebar";
import { SiteHeader } from "./dashboard-components/SiteHeader";
import FAQManagement from "./dashboard-components/FAQManagement";
import RealtyManagement from "./dashboard-components/RealtyManagement";
import RentalManagement from "./dashboard-components/RentalManagement";
import ReviewManagement from "./dashboard-components/ReviewManagement";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "FAQ Management":
        return <FAQManagement />;
      case "Realty Management":
        return <RealtyManagement />;
      case "Rental Management":
        return <RentalManagement />;
      case "Review Management":
        return <ReviewManagement />;

      default:
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
            <p className="text-muted-foreground">
              Welcome to the OFYS Admin Dashboard. Select a section from the
              sidebar to manage your content.
            </p>
          </div>
        );
    }
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        variant="inset"
        onSectionChange={setActiveSection}
        activeSection={activeSection}
      />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {renderContent()}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
