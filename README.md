# The American Quarter Millennium
# DevOps Infrastructure Showcase 🇺🇸

This repository documents the step-by-step buildout of a production-style AWS infrastructure for a simple e-commerce website (patriotic t-shirts) - with the primary goal of demonstrating real-world DevOps, cloud, networking, and security skills.

---

## 🎯 Project Purpose

This project is a **hands-on DevOps showcase** designed to demonstrate:

- Cloud infrastructure provisioning
- Linux server administration
- Reverse proxy configuration
- TLS/HTTPS hardening
- DNS management
- Secure networking principles
- Iterative evolution toward production-grade architecture

The long-term goal is to evolve this into:

- A custom VPC
- Public and private subnets
- Application Load Balancer
- Auto Scaling Group
- Bastion or SSM-only access
- Infrastructure as Code (Terraform)
- CI/CD pipeline
- Observability and monitoring

This repository documents the journey.

---

# 🚀 Current Architecture (Phase 1)

### Live Infrastructure

- AWS EC2 (Ubuntu)
- Nginx
- Let’s Encrypt SSL (Certbot)
- Custom domain with HTTPS
- Security groups with minimal open ports

### High-Level Flow

```
Internet
   ↓
Route53 / DNS
   ↓
EC2 (Ubuntu)
   ↓
Nginx
   ↓
Static Website (Patriotic T-Shirts)
```

---

# 🛠 What Was Implemented

## 1. EC2 Provisioning

- Launched Ubuntu LTS instance
- SSH key-based authentication
- Disabled password authentication
- Configured security group:
  - 22 (restricted)
  - 80 (HTTP)
  - 443 (HTTPS)

## 2. Nginx Installation & Configuration

- Installed Nginx
- Configured server blocks
- Enabled domain-based routing
- Configured HTTP → HTTPS redirect
- Verified configuration with:

```bash
sudo nginx -t
```

## 3. Let’s Encrypt SSL

- Installed Certbot
- Generated TLS certificate
- Configured automatic renewal
- Verified HTTPS enforcement
- Confirmed A+ SSL configuration behavior

---

# 🔐 Security Practices Applied

- Key-based SSH only
- Principle of least privilege (security groups)
- HTTPS enforced
- Automatic certificate renewal
- No unnecessary services running
- System updates applied

---

# 📈 Planned Evolution (Phase 2 & 3)

This project is intentionally being built in production-like stages.

## Phase 2 – Networking & High Availability

- Custom VPC
- Public + Private subnets
- NAT Gateway
- Internet Gateway
- Application Load Balancer
- Move EC2 instances into private subnet
- Remove direct public SSH access

Target Architecture:

```
                Internet
                    ↓
           Application Load Balancer
                    ↓
            Private EC2 Instances
                    ↓
              Nginx / App
```

---

## Phase 3 – Infrastructure as Code

- Terraform modules for:
  - VPC
  - Subnets
  - Routing tables
  - ALB
  - Security groups
  - EC2
- Remote state management
- Reproducible infrastructure

---

## Phase 4 – CI/CD

- GitHub Actions pipeline
- Automated deploy to EC2
- Zero-downtime deployment strategy
- Lint + validation checks

---

## Phase 5 – Observability

- CloudWatch logs
- Metrics and alarms
- Uptime monitoring
- Structured logging

---

# 🧠 What This Project Demonstrates

- Understanding of Linux systems
- Reverse proxy configuration
- DNS and TLS lifecycle management
- Cloud networking fundamentals
- Secure-by-default mindset
- Incremental infrastructure design
- Production management

---

# 🏁 Current Status

✅ EC2 running Ubuntu  
✅ Nginx configured  
✅ Domain connected  
✅ HTTPS enforced  
✅ TLS auto-renewal  
🚧 VPC + Load Balancer in progress  


