resource "google_compute_firewall" "frontend_rules" {
  name    = "frontend"
  network = "default"

  allow {
    protocol = "tcp"
    ports = ["3000"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags = ["frontend"]
}

resource "google_compute_firewall" "monitor_rules" {
  name  = "monitor"
  network = "default"

  allow {
    protocol = "tcp"
    ports = ["9090", "3000"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags = ["monitor"]
}

resource "google_compute_firewall" "microservices_rules" {
  name  = "microservices"
  network = "default"

  allow {
    protocol = "tcp"
    ports = ["5041", "5042", "5043"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags = ["microservices"]
}

resource "google_compute_firewall" "database_rules" {
  name  = "database"
  network = "default"

  allow {
    protocol = "tcp"
    ports = ["27017"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags = ["database"]
}

resource "google_compute_firewall" "node-exporter_rules" {
  name  = "node-exporter"
  network = "default"

  allow {
    protocol = "tcp"
    ports = ["9100"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags = ["database", "microservices", "frontend", "load-balancer"]
}

resource "google_compute_firewall" "load-balancer_rules" {
  name    = "load-balancer"
  network = "default"

  allow {
    protocol = "tcp"
    ports = ["80", "443"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags = ["load-balancer"]
}