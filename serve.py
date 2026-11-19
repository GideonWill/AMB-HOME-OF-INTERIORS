import http.server
import socketserver
import os
import urllib.parse

class RangeHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()

    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            for index in ("index.html", "index.htm"):
                idx_path = os.path.join(path, index)
                if os.path.exists(idx_path):
                    path = idx_path
                    break
        ctype = self.guess_type(path)
        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, "File not found")
            return None
        fs = os.fstat(f.fileno())
        size = fs[6]
        range_header = self.headers.get('Range')
        if range_header and range_header.startswith('bytes='):
            try:
                ranges = range_header[6:].split('-')
                start = int(ranges[0]) if ranges[0] else 0
                end = int(ranges[1]) if ranges[1] else size - 1
                end = min(end, size - 1)
                length = end - start + 1
                self.send_response(206)
                self.send_header('Content-Type', ctype)
                self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
                self.send_header('Content-Length', str(length))
                self.end_headers()
                f.seek(start)
                return f
            except Exception:
                pass
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(size))
        self.end_headers()
        return f

if __name__ == '__main__':
    httpd = http.server.ThreadingHTTPServer(('0.0.0.0', 5500), RangeHandler)
    print("Serving on 0.0.0.0:5500")
    httpd.serve_forever()
