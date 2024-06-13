# Gunakan image yang memiliki nginx
FROM nginx:alpine

# Salin file data.json ke dalam direktori default nginx
COPY data.json /usr/share/nginx/html/data.json

# Salin konfigurasi default nginx yang telah dimodifikasi
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 untuk akses HTTP
EXPOSE 80

# CMD default dari nginx sudah sesuai untuk menjalankan server