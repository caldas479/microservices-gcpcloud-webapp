output "get-service_ip" {
  value = formatlist("%s = %s", google_compute_instance.get-service[*].name, google_compute_instance.get-service[*].network_interface.0.access_config.0.nat_ip)
}

output "add-service_ip" {
  value = formatlist("%s = %s", google_compute_instance.add-service[*].name, google_compute_instance.add-service[*].network_interface.0.access_config.0.nat_ip)
}

output "delete-service_ip" {
  value = formatlist("%s = %s", google_compute_instance.delete-service[*].name, google_compute_instance.delete-service[*].network_interface.0.access_config.0.nat_ip)
}

output "database_ip" {
  value = google_compute_instance.database.network_interface.0.access_config.0.nat_ip
}

output "frontend_ip" {
  value = google_compute_instance.frontend.network_interface.0.access_config.0.nat_ip
}

output "monitor_ip" {
  value = google_compute_instance.monitor.network_interface.0.access_config.0.nat_ip
}

output "load_balancer_ip" {
  value = formatlist("%s = %s", google_compute_instance.load-balancer[*].name, google_compute_instance.load-balancer[*].network_interface.0.access_config.0.nat_ip)
}

output "load_balancer_ssh" {
 value = google_compute_instance.load-balancer[*].self_link
}

