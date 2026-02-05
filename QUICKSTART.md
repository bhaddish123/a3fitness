# 🚀 Quick Start Guide - A3 Fitness

## Prerequisites Checklist
- ✅ Java 17+ installed (`java -version`)
- ✅ Node.js 16+ installed (`node -v`)
- ✅ PostgreSQL 14+ installed and running
- ✅ Maven 3.9.12+ installed (`mvn -v`)

## 5-Minute Setup

### Step 1: Database Setup (2 minutes)
```bash
# Create database
psql -U postgres
CREATE DATABASE a3fitness;
\q

# Or using pgAdmin, create a database named "a3fitness"
```

### Step 2: Backend Configuration (1 minute)
```bash
cd a3fitness/backend

# Edit src/main/resources/application.properties
# Update these lines:
spring.datasource.password=YOUR_POSTGRES_PASSWORD
app.jwt.secret=GENERATE_A_SECURE_256_BIT_KEY_HERE
```

**Generate JWT Secret:**
```bash
# On Mac/Linux
openssl rand -base64 64

# Or use any 64+ character random string
```

### Step 3: Start Backend (1 minute)
```bash
# Still in backend directory
mvn clean install
mvn spring-boot:run

# Should see: "Started A3FitnessApplication"
# Backend running at http://localhost:8080
```

### Step 4: Initialize Database (30 seconds)
```bash
# In a new terminal, connect to database
psql -U postgres -d a3fitness

# Run these commands:
INSERT INTO roles (name) VALUES ('ROLE_USER'), ('ROLE_TRAINER'), ('ROLE_ADMIN');

INSERT INTO availability (day_of_week, start_time, end_time, is_active, slot_duration_minutes)
VALUES 
('MONDAY', '08:00:00', '18:00:00', true, 60),
('TUESDAY', '08:00:00', '18:00:00', true, 60),
('WEDNESDAY', '08:00:00', '18:00:00', true, 60),
('THURSDAY', '08:00:00', '18:00:00', true, 60),
('FRIDAY', '08:00:00', '18:00:00', true, 60);

\q
```

### Step 5: Start Frontend (30 seconds)
```bash
cd a3fitness/frontend
npm install
npm start

# Frontend running at http://localhost:3000
```

## 🎉 You're Live!

Open http://localhost:3000 and you should see the A3 Fitness homepage!

### Test the App
1. Click "Login" → "Sign up"
2. Create an account
3. Go to "Book Session"
4. Select a date/time and book!

## Common Issues & Fixes

### Issue: "Connection refused" on backend
**Fix:** Make sure PostgreSQL is running
```bash
# Mac
brew services start postgresql

# Linux
sudo service postgresql start

# Windows
# Start via Services app
```

### Issue: "Role not found" error
**Fix:** Run the database seed commands from Step 4

### Issue: Port 8080 already in use
**Fix:** Kill the process or change port in application.properties
```bash
# Find process
lsof -i :8080

# Kill it
kill -9 <PID>
```

### Issue: npm install fails
**Fix:** Clear cache and retry
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

### 1. Configure Email Notifications
Edit `backend/src/main/resources/application.properties`:
```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

### 2. Add Payment Integration (Stripe)
```bash
# Add to backend/pom.xml
<dependency>
    <groupId>com.stripe</groupId>
    <artifactId>stripe-java</artifactId>
    <version>24.0.0</version>
</dependency>
```

### 3. Deploy to Production
See README.md for AWS deployment instructions

## Project Structure
```
a3fitness/
├── backend/          # Spring Boot API
├── frontend/         # React App
└── README.md        # Full documentation
```

## Default Ports
- Backend: http://localhost:8080
- Frontend: http://localhost:3000
- PostgreSQL: localhost:5432

## Tech Stack Summary (Matching nimbus-core)
- **Spring Boot:** 4.0.2
- **JWT:** 0.11.5
- **Maven:** 3.9.12
- **Java:** 17
- **Frontend:** React 18 + React Router + Axios
- **Database:** PostgreSQL 14+
- **Auth:** JWT tokens with role-based access

## Support
If you get stuck, check the full README.md or contact support.

---

**Built with the exact same stack as nimbus-core** 🚀
Spring Boot 4.0.2 • JWT 0.11.5 • Maven 3.9.12 • Java 17 • PostgreSQL • React 18
