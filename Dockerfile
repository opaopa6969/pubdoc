FROM nginx:alpine

# docs/ 下のファイルを serve
COPY docs/ /usr/share/nginx/html/

# デフォルト nginx 設定で OK（/ → index.html）
EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
