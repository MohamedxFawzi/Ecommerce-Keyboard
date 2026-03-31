import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import {
  LuCheck,
  LuChevronRight,
  LuCircleHelp,
  LuMail,
  LuPackageCheck,
  LuPackageOpen,
} from "react-icons/lu";
import Stripe from "stripe";

import { Logo } from "@/components/Logo";
import { FadeIn } from "@/components/FadeIn";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export const metadata: Metadata = {
  title: "Order Confirmed | Nimbus Keyboards",
  description: "Welcome to the elite club.",
};

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams.session_id;

  // Error State (Missing Session)
  if (!sessionId) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
          padding: "0 1rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            height: "5rem",
            width: "5rem",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "9999px",
            backgroundColor: "#fee2e2",
            color: "#dc2626",
          }}
        >
          <LuCircleHelp style={{ height: "2.5rem", width: "2.5rem" }} />
        </div>
        <h1
          className="font-black-slanted"
          style={{
            fontSize: "3rem",
            textTransform: "uppercase",
            letterSpacing: "-0.05em",
            color: "#111827",
            margin: 0,
          }}
        >
          Session Missing
        </h1>
        <p
          style={{ marginTop: "1rem", fontSize: "1.125rem", color: "#4b5563" }}
        >
          We couldn&apos;t find your order details.
        </p>
        <Link
          href="/"
          style={{
            marginTop: "2rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            borderRadius: "9999px",
            backgroundColor: "#01A7E1",
            padding: "0.875rem 2rem",
            fontWeight: "bold",
            color: "#ffffff",
            textDecoration: "none",
          }}
        >
          Return Home{" "}
          <LuChevronRight style={{ height: "1.25rem", width: "1.25rem" }} />
        </Link>
      </div>
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const orderDetails = {
      sessionId: session.id,
      customerEmail: session.customer_details?.email || "No email provided",
      amount: session.amount_total
        ? (session.amount_total / 100).toFixed(2)
        : "0.00",
    };

    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
          padding: "6rem 0",
          color: "#111827",
          fontFamily: "sans-serif",
        }}
      >
        <FadeIn targetChildren>
          <div
            style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1rem" }}
          >
            {/* Header Section */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  margin: "0 auto",
                  display: "flex",
                  height: "6rem",
                  width: "6rem",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(1, 167, 225, 0.1)",
                  color: "#01A7E1",
                }}
              >
                <LuCheck style={{ height: "3rem", width: "3rem" }} />
              </div>

              <h1
                className="font-black-slanted"
                style={{
                  marginTop: "2rem",
                  fontSize: "4rem",
                  textTransform: "uppercase",
                  letterSpacing: "-0.05em",
                  color: "#111827",
                  marginBottom: "1rem",
                }}
              >
                Payment <span style={{ color: "#01A7E1" }}>Confirmed</span>
              </h1>

              <p
                style={{
                  margin: "0 auto",
                  maxWidth: "36rem",
                  fontSize: "1.125rem",
                  color: "#4b5563",
                }}
              >
                Welcome to the elite club. Your Nimbus Vapor75 is being
                precision-checked and prepared for shipment.
              </p>
            </div>

            {/* Order Details Card */}
            <div
              style={{
                marginTop: "4rem",
                overflow: "hidden",
                borderRadius: "1.5rem",
                border: "1px solid #e5e7eb",
                backgroundColor: "#ffffff",
                padding: "2rem",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
            >
              <div
                style={{
                  marginBottom: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  borderBottom: "1px solid #f3f4f6",
                  paddingBottom: "1.5rem",
                }}
              >
                <h2
                  className="font-bold-slanted"
                  style={{
                    fontSize: "1.5rem",
                    textTransform: "uppercase",
                    letterSpacing: "-0.025em",
                    color: "#111827",
                    margin: 0,
                  }}
                >
                  Order details
                </h2>
                <Logo
                  style={{ height: "1.5rem", width: "auto", color: "#111827" }}
                />
              </div>

              {/* Order Info List */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <DetailRow label="Order ID" value={orderDetails.sessionId} />
                <DetailRow label="Email" value={orderDetails.customerEmail} />
                <DetailRow label="Product" value="Nimbus Vapor75" />
                <DetailRow
                  label="Amount Paid"
                  value={`$${orderDetails.amount}`}
                  isHighlight
                />
                <DetailRow
                  label="Status"
                  value={
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        borderRadius: "9999px",
                        backgroundColor: "#ecfdf5",
                        padding: "0.25rem 0.75rem",
                        fontSize: "0.875rem",
                        fontWeight: "bold",
                        color: "#15803d",
                      }}
                    >
                      <span
                        style={{
                          height: "0.375rem",
                          width: "0.375rem",
                          borderRadius: "9999px",
                          backgroundColor: "#22c55e",
                        }}
                      />{" "}
                      Confirmed
                    </span>
                  }
                />
              </div>
            </div>

            {/* The Journey Ahead Section */}
            <div style={{ marginTop: "5rem" }}>
              <h3
                className="font-bold-slanted"
                style={{
                  marginBottom: "2rem",
                  textAlign: "center",
                  fontSize: "1.875rem",
                  textTransform: "uppercase",
                  letterSpacing: "-0.025em",
                  color: "#111827",
                }}
              >
                The Journey Ahead
              </h3>

              <div
                style={{
                  display: "grid",
                  gap: "1.5rem",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                }}
              >
                <StepCard
                  icon={
                    <LuMail style={{ height: "1.5rem", width: "1.5rem" }} />
                  }
                  title="Notification"
                  desc="Watch your inbox for the tracking code."
                />
                <StepCard
                  icon={
                    <LuPackageOpen
                      style={{ height: "1.5rem", width: "1.5rem" }}
                    />
                  }
                  title="Preparation"
                  desc="Our team is hand-testing your switches."
                />
                <StepCard
                  icon={
                    <LuPackageCheck
                      style={{ height: "1.5rem", width: "1.5rem" }}
                    />
                  }
                  title="Shipping"
                  desc="Arrival estimated within 5-7 business days."
                />
              </div>
            </div>

            {/* Action Button */}
            <div
              style={{
                marginTop: "4rem",
                display: "flex",
                justifyContent: "center",
                paddingBottom: "3rem",
              }}
            >
              <Link
                href="/"
                className="font-bold-slanted"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "9999px",
                  backgroundColor: "#01A7E1",
                  padding: "1rem 2.5rem",
                  fontSize: "1.125rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.025em",
                  color: "#ffffff",
                  textDecoration: "none",
                  boxShadow: "0 10px 15px -3px rgba(1, 167, 225, 0.3)",
                }}
              >
                Back to Store
                <LuChevronRight
                  style={{
                    marginLeft: "0.5rem",
                    height: "1.25rem",
                    width: "1.25rem",
                  }}
                />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    );
  } catch (error) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
          padding: "0 1rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            height: "5rem",
            width: "5rem",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "9999px",
            backgroundColor: "#fee2e2",
            color: "#dc2626",
          }}
        >
          <LuCircleHelp style={{ height: "2.5rem", width: "2.5rem" }} />
        </div>
        <h1
          className="font-black-slanted"
          style={{
            fontSize: "3rem",
            textTransform: "uppercase",
            letterSpacing: "-0.05em",
            color: "#111827",
            margin: 0,
          }}
        >
          Error Loading Order
        </h1>
        <p
          style={{ marginTop: "1rem", fontSize: "1.125rem", color: "#4b5563" }}
        >
          There was an issue loading your session details.
        </p>
        <Link
          href="/"
          style={{
            marginTop: "2rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            borderRadius: "9999px",
            backgroundColor: "#01A7E1",
            padding: "0.875rem 2rem",
            fontWeight: "bold",
            color: "#ffffff",
            textDecoration: "none",
          }}
        >
          Return Home{" "}
          <LuChevronRight style={{ height: "1.25rem", width: "1.25rem" }} />
        </Link>
      </div>
    );
  }
}

// --- Sub-components ---

function DetailRow({
  label,
  value,
  isHighlight,
}: {
  label: string;
  value: React.ReactNode;
  isHighlight?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "0.5rem",
        borderBottom: "1px solid #f3f4f6",
        paddingBottom: "1rem",
      }}
    >
      <span
        style={{
          fontSize: "0.875rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#6b7280",
        }}
      >
        {label}
      </span>
      <span
        style={{
          wordBreak: "break-all",
          textAlign: "left",
          fontSize: "1.125rem",
          color: isHighlight ? "#01A7E1" : "#111827",
          fontWeight: isHighlight ? "900" : "normal",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function StepCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "1rem",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        padding: "1.5rem",
        textAlign: "center",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      }}
    >
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          height: "3.5rem",
          width: "3.5rem",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "9999px",
          backgroundColor: "#eff6ff",
          color: "#3b82f6",
        }}
      >
        {icon}
      </div>
      <h4
        className="font-bold-slanted"
        style={{
          marginBottom: "0.5rem",
          fontSize: "1.125rem",
          textTransform: "uppercase",
          letterSpacing: "-0.025em",
          color: "#111827",
          margin: "0 0 0.5rem 0",
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontSize: "0.875rem",
          lineHeight: "1.625",
          color: "#4b5563",
          margin: 0,
        }}
      >
        {desc}
      </p>
    </div>
  );
}
