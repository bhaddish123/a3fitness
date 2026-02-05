
A3 Fitness Training Platform

A production-style web application for managing personal training sessions, built with a secure backend, self-serve booking, and trainer-controlled workflows. This repository focuses on clean backend architecture, authentication, and booking logic suitable for real-world use.

⸻

🚀 Overview

This project centralizes:
	•	User authentication
	•	Session scheduling
	•	Payments and confirmations
	•	Automated client communication

The goal is to replace manual and third-party booking flows with a single, reliable system owned end-to-end.

⸻

🧠 Core MVP Flow
	1.	User registers and authenticates
	2.	User views trainer availability
	3.	User books and pays for a session
	4.	System sends confirmation and reminders
	5.	User cancels or reschedules within policy rules

⸻

🔐 Backend Focus

Authentication
	•	JWT-based, stateless authentication
	•	Role-aware access control
	•	Client: book and manage sessions
	•	Trainer: manage availability, policies, and content
	•	Protected API endpoints

Booking
	•	Server-side availability management
	•	Atomic booking to prevent double-booking
	•	Payment-gated booking confirmation
	•	Enforced cancellation and reschedule rules

⸻

📦 MVP Feature Set

Client
	•	Account creation & login
	•	Direct session booking
	•	Real-time availability
	•	Payment + confirmation
	•	Email / SMS reminders

Trainer
	•	Manage schedule and availability
	•	Define cancellation / no-show policies
	•	Update public-facing content
	•	View upcoming sessions

⸻

🧩 API Surface (High-Level)
	•	/auth — registration, login, token lifecycle
	•	/users — role-based user access
	•	/availability — schedule management
	•	/bookings — create, cancel, reschedule sessions
	•	/notifications — email / SMS triggers
	•	/content — trainer-managed pages

⸻

📁 Project Structure

backend/    Spring Boot REST API
frontend/   React client


⸻

🛠️ Tech Stack
	•	Backend: Java, Spring Boot
	•	Auth: JWT
	•	Database: PostgreSQL
	•	Frontend: React
	•	Payments: Third-party provider
	•	Notifications: Email / SMS services

⸻

📌 Status

This repository represents an MVP-first implementation, with a strong emphasis on backend correctness, API design, and production-ready patterns. Future iterations may expand dashboards, analytics, and guided training features.


