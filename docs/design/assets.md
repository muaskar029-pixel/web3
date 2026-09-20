# Aset visual ShieldChain

Dibuat dengan tool imagegen bawaan. Tidak menggunakan CLI/API fallback. Ilustrasi merupakan aset konseptual, bukan foto produk atau bukti keamanan.

## Hero

Output final: `public/images/shield-hero.webp` (1000 × 1000). Versi PNG sumber disimpan di `public/images/shield-hero.png`.

Prompt:

Use case: stylized-concept. Asset type: square landing-page hero artwork for ShieldChain, an Indonesian cybersecurity and crypto risk intelligence product. Subject: one sculptural translucent smoky glass shield with brushed titanium edges, floating upright at a slight three-quarter angle over two low concentric dark metallic discs. Precise restrained cyan edge highlights, delicate etched concentric rings on the base suggesting a security scanner. Premium industrial product photography / refined 3D render, realistic physically based materials, clean sophisticated composition, object centered with generous negative space, high detail. Scene: seamless very dark navy studio background #09121c, matte floor. Cool soft directional studio light, restrained cyan reflections, no bright bloom or neon glows, no purple, no coins, no padlocks, no text, no labels, no logos, no watermark, no user-interface screenshot. Square 1024x1024 composition. The image will be used as a right-side hero asset.

## Validasi komunitas

Output final: `public/images/community-network.webp` (1000 × 667).

Prompt:

Use case: stylized-concept. Asset type: wide 3:2 supporting illustration for the community verification section of ShieldChain Indonesian cybersecurity website. Subject: three precise translucent smoky cyan glass rectangular blocks arranged in a triangular network on a dark brushed metal surface, fine etched luminous cyan paths linking them, soft industrial product-photography lighting. Represents independent community validators sharing evidence. Premium realistic 3D materials, subtle highlights, close-up wide landscape composition, entire network clearly visible and generous margins. Matte deep navy #09121c background, cool silver accents and restrained cyan only. No shield, no coins, no writing, no labels, no UI screenshots, no padlocks, no logos, no neon bloom, no watermark.

Konversi format WebP dan resize dilakukan untuk optimasi pengiriman. Komposisi gambar tidak diganti. Hero dimuat dengan Next Image loading eager dan fetchPriority tinggi sesuai panduan Next.js 16, menggantikan prop priority yang deprecated. Sizes memperhitungkan padding ilustrasi agar browser tidak mengunduh gambar terlalu besar pada mobile. Kedua gambar mempunyai ukuran intrinsik dan alt text.

Ikon tab `src/app/icon.svg` diserialisasi dari komponen ShieldCheck pada paket Lucide yang terpasang, mengikuti ikon merek di navigasi; bukan path SVG buatan sendiri.

## Penyempurnaan lintas tema

Asset aktif: `public/images/shield-hero-cutout.webp` (1000 × 1000, alpha transparan). Versi hero awal dipertahankan sebagai sumber. Tool imagegen bawaan menghapus background atas hasil review tema terang.

Prompt edit:

Use case: background-extraction. Asset type: transparent hero artwork for ShieldChain website. Edit this image: preserve exactly the smoky glass titanium shield and its two circular metal base discs, their geometry, proportions, material, cyan reflections and camera angle. Remove ALL dark studio background, wall and floor outside the shield and base. Output a clean cutout on a genuinely transparent alpha background. Clean crisp anti-aliased edges, no halos, no dark vignette, no surrounding floor, no glow outside the object. Keep the entire shield and base in frame, leave a small even transparent margin. No added objects or text.
