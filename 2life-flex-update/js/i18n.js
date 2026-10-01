(function () {
  "use strict";

  var STORAGE_KEY = "2life_lang";

  var TRANSLATIONS = {
    en: {
      "meta.title": `2LIFE | 3D Printed Automotive Parts & Padel Accessories`,
      "meta.description": `2LIFE reverse-engineers and 3D prints fragile, discontinued plastic parts for classic European cars: trim clips, dashboard parts, housings and more.`,

      "a11y.skipLink": `Skip to content`,
      "a11y.logoHome": `2LIFE home`,
      "a11y.navToggle": `Toggle menu`,
      "a11y.statsLabel": `Key figures`,

      "nav.services": `Services`,
      "nav.process": `Process`,
      "nav.parts": `Parts`,
      "nav.materials": `Materials`,
      "nav.about": `About`,
      "nav.contact": `Contact`,

      "header.cta": `Get a Quote`,

      "hero.eyebrow": `3D printed &middot; Made to fit &middot; Jakarta`,
      "hero.headline": `<span>Discontinued car parts.</span> <span>Custom padel gear.</span> <span>Printed to fit.</span>`,
      "hero.sub": `2LIFE rebuilds the fragile plastic parts classic European car makers stopped producing, and makes racket holders and court accessories for padel clubs, with your logo on them.`,
      "hero.cta1": `Automotive Parts`,
      "hero.cta2": `Padel Accessories`,
      "hero.tagMore": `+ more`,

      "stats.label1": `Parts printed`,
      "stats.label2": `Models supported`,
      "stats.label3": `Avg. turnaround`,
      "stats.label4": `Print tolerance`,

      "services.eyebrow": `What we do`,
      "services.title": `From broken original to printed replacement`,
      "services.sub": `Every part is rebuilt around your original, not a generic mold.`,
      "services.card1.title": `3D Scanning`,
      "services.card1.body": `We digitize your broken or worn part with precision structured-light scanning, capturing every curve and mounting point.`,
      "services.card2.title": `CAD Reconstruction`,
      "services.card2.body": `Broken pieces are digitally repaired and modeled to the part's original geometry and tolerances before printing.`,
      "services.card3.title": `Precision Printing`,
      "services.card3.body": `Printed layer by layer in UV-stable, impact-resistant materials matched to the part's original job under the hood or dash.`,
      "services.card4.title": `Fit-Check & Finish`,
      "services.card4.body": `Each part is sanded, dyed to match, and dry-fit tested against reference drawings before it ships to you.`,

      "process.eyebrow": `The process`,
      "process.title": `Four steps from cracked to complete`,
      "process.step1.title": `Send us the part`,
      "process.step1.body": `Mail your original (even in pieces) or send clear photos with measurements and your car's make, model, and year.`,
      "process.step2.title": `We model it`,
      "process.step2.body": `Our team scans and reconstructs the part in CAD, restoring worn or missing geometry to spec.`,
      "process.step3.title": `We print & finish`,
      "process.step3.body": `Printed in a durable material suited to the part, then cleaned, finished, and quality-checked by hand.`,
      "process.step4.title": `Delivered to your door`,
      "process.step4.body": `Your new part ships worldwide, ready to install, with the digital file kept on file for reorders.`,

      "parts.eyebrow": `Commonly restored`,
      "parts.title": `Small parts, big headaches: solved`,
      "parts.sub": `If it's brittle, discontinued, or priced like gold by a dealer, we can probably print it.`,
      "parts.tile1": `Dashboard clips`,
      "parts.tile2": `Trim & mouldings`,
      "parts.tile3": `Tail-light housings`,
      "parts.tile4": `Interior brackets`,
      "parts.tile5": `Knobs & levers`,
      "parts.tile6": `Grille components`,
      "parts.tile7": `HVAC vents`,
      "parts.tile8": `Switch surrounds`,
      "parts.tile9": `Door handle parts`,
      "parts.tile10": `Console inserts`,
      "parts.tile11": `Badge mounts`,
      "parts.tile12": `Custom / other`,

      "materials.eyebrow": `Materials`,
      "materials.title": `Matched to the job, not one-size-fits-all`,
      "materials.card1.title": `ASA / ABS`,
      "materials.card1.tag": `UV & heat resistant`,
      "materials.card1.body": `Our default for exterior and dashboard parts, holding color and shape under sun and engine-bay heat.`,
      "materials.card2.title": `Reinforced Nylon`,
      "materials.card2.tag": `High impact strength`,
      "materials.card2.body": `Used for brackets and clips that take repeated stress or vibration, tougher than the factory original.`,
      "materials.card3.title": `Resin (SLA)`,
      "materials.card3.tag": `Fine detail finish`,
      "materials.card3.body": `For badges, switch surrounds, and trim where sharp edges and a smooth, paint-ready surface matter most.`,

      "about.eyebrow": `Why 2LIFE`,
      "about.title": `Keeping old European iron on the road`,
      "about.p1": `Parts bins for cars built before the 2000s are drying up. Dealers stop stocking, suppliers stop tooling, and the plastic that's left turns brittle with age. We built 2LIFE to solve exactly that problem: a small-batch, print-on-demand parts shop for the pieces nobody else will make anymore.`,
      "about.p2": `Every job starts with your part, not a catalog, so what you get back fits the way the original did, panel gaps and all.`,
      "about.point1.strong": `No minimum order.`,
      "about.point1.text": `We print a single clip as readily as a full trim set.`,
      "about.point2.strong": `Files kept on record.`,
      "about.point2.text": `Reorder a part in seconds if it breaks again.`,
      "about.point3.strong": `Worldwide shipping.`,
      "about.point3.text": `Small, light parts ship affordably almost anywhere.`,
      "about.point4.strong": `Owner & enthusiast run.`,
      "about.point4.text": `We restore our own classics too.`,

      "testimonials.eyebrow": `From the garage`,
      "testimonials.title": `Owners who found their unfindable part`,
      "testimonials.quote1": `"Tracked down a dash vent clip for my W123 that's been NLA for fifteen years. Fit first try."`,
      "testimonials.quote2": `"Sent them a bag of shattered trim clips from my 2002tii. Got back a full set, stronger than stock."`,
      "testimonials.quote3": `"The tail light housing quote from the dealer was absurd. 2LIFE printed one for a fraction of it."`,

      "contact.eyebrow": `Get in touch`,
      "contact.title": `Tell us what you need`,
      "contact.sub": `For car parts, include your car's make, model and year. For padel products, tell us which items and how many. We'll reply with a quote and turnaround time, usually within one business day.`,
      "contact.shipping": `Ships worldwide, based in Jakarta, Indonesia`,

      "nav.automotive": `Automotive`,
      "nav.sports": `Sports`,
      "divisions.go": `Explore →`,
      "divisions.auto.label": `Automotive`,
      "divisions.auto.kicker": `Division 01`,
      "divisions.auto.text": `Discontinued interior and trim parts for classic cars, rebuilt from your original.`,
      "divisions.auto.sub": `Reverse-engineered replacement parts for classic European cars.`,
      "divisions.sports.label": `Sports`,
      "divisions.sports.kicker": `Division 02`,
      "divisions.sports.text": `Padel racket holders, court accessories and custom-branded pieces for clubs.`,
      "divisions.sports.sub": `3D-printed padel accessories for clubs, courts and players, designed and made in Jakarta.`,
      "sports.eyebrow": `Padel range`,
      "sports.title": `Built for the court, branded for your club`,
      "sports.sub": `Practical pieces that keep rackets, bags and phones organised, available with your club's logo.`,
      "sports.soon": `Coming soon`,
      "sports.p1.title": `Indoor Racket Holder`,
      "sports.p1.body": `Wall-mounted holder that keeps rackets tidy and on display in lounges, pro shops and locker areas.`,
      "sports.p2.title": `Outdoor Racket Holder`,
      "sports.p2.body": `A courtside version made to stand up to sun and humidity, so players have a safe spot for their racket between games.`,
      "sports.p3.title": `Bag Holder`,
      "sports.p3.body": `Keeps padel bags off the floor and out of the way, freeing up space around the court.`,
      "sports.p4.title": `Court Phone Holder`,
      "sports.p4.body": `Sits on the net and holds two phones, one facing each side, so players can film their matches.`,
      "sports.p5.title": `Ball Dispenser`,
      "sports.p5.body": `A reloadable canister that hooks onto the court fencing and keeps spare balls within reach.`,
      "sports.p6.title": `Custom Club Branding`,
      "sports.p6.body": `Any piece can carry your club's logo or name, for a single court or every branch.`,
      "sports.ctaText": `Running a club or several branches? Ask about volume pricing and logo customisation.`,
      "sports.ctaBtn": `Request Club Pricing`,
      "form.category": `What do you need?`,
      "form.categoryAuto": `Automotive part`,
      "form.categorySports": `Sports / padel products`,
      "form.carModelSports": `Club or venue name (optional)`,
      "form.carModelPlaceholderSports": `e.g. your club or court name`,
      "form.detailsSports": `Which products, and how many?`,
      "form.detailsPlaceholderSports": `Products, quantities, number of courts or branches, and whether you'd like your logo on them...`,
      "nav.howItWorks": `How It Works`,
      "nav.support": `Support`,
      "support.eyebrow": `Support`,
      "support.title": `Questions before you order?`,
      "support.sub": `Quick answers below. For anything else, reach us directly; we usually reply within one business day.`,
      "support.email": `Email`,
      "support.call": `Call us`,
      "support.q1": `How do I get a quote?`,
      "support.a1": `Fill in our quote form or message us on WhatsApp with photos of the part or the products you need. We reply with a price and turnaround time, usually within one business day.`,
      "support.q2": `Can you make a car part from photos only?`,
      "support.a2": `Often, yes, if the photos are clear and include measurements. For complex parts, sending the original (even if broken) gives the best fit.`,
      "support.q3": `Do you ship outside Indonesia?`,
      "support.a3": `Yes. We're based in Jakarta and ship worldwide.`,
      "support.q4": `Is there a minimum order?`,
      "support.a4": `No. We print a single clip as readily as a full set. Padel clubs ordering for several courts or branches can ask about volume pricing.`,
      "support.q5": `Can you put our club's logo on the padel products?`,
      "support.a5": `Yes. Any product in the sports range can carry your club's logo or name.`,
      "support.q6": `What if the part breaks again?`,
      "support.a6": `We keep the digital file on record, so a reorder is quick and fits the same as the first one.`,
      "nav.home": `Home`,
      "meta.title.automotive": `Automotive Parts | 2LIFE`,
      "meta.title.sports": `Padel Accessories | 2LIFE`,
      "meta.title.support": `Support | 2LIFE`,
      "meta.title.quote": `Get a Quote | 2LIFE`,
      "cta.automotive.text": `Have a part that's discontinued or cracked? Send us the details.`,
      "cta.automotive.btn": `Request a Part`,
      "cta.general.text": `Ready to order or still have a question? Tell us what you need.`,
      "cta.general.btn": `Get a Quote`,
      "hero.dim": `measured from your original`,
      "a11y.whatsapp": `Chat with us on WhatsApp`,
      "facts.f1.title": `No minimum order`,
      "facts.f1.text": `One clip or a full set.`,
      "facts.f2.title": `Files kept on record`,
      "facts.f2.text": `Reorders fit the same as the first.`,
      "facts.f3.title": `Your club's logo`,
      "facts.f3.text": `On any padel product.`,
      "facts.f4.title": `Ships worldwide`,
      "facts.f4.text": `From our workshop in Jakarta.`,
      "bench.title": `Revisions until it fits like the original`,
      "bench.body": `Our air-conditioning vent bezel went through more than 170 design revisions before we were happy with how it clipped in. Every part gets that same patience: we keep adjusting until it fits the way the factory part did.`,
      "gallery.title": `Before and after`,
      "form.name": `Name`,
      "form.email": `Email`,
      "form.phone": `Phone number`,
      "form.phonePlaceholder": `e.g. 0812-3456-7890`,
      "form.carModel": `Car make / model / year`,
      "form.carModelPlaceholder": `e.g. Porsche 911 (1986)`,
      "form.address": `Shipping address`,
      "form.addressPlaceholder": `Street, city, postal code, country`,
      "form.details": `Describe the part`,
      "form.detailsPlaceholder": `Where it's located, how it broke, any measurements you have...`,
      "form.photoHint": `Need to send photos or videos? This form can't accept attachments yet, so email them to <a href="mailto:2lifeparts@gmail.com">2lifeparts@gmail.com</a> or message us at <a href="tel:+6281615555777">+62 816-1555-5777</a> directly.`,
      "form.submit": `Send Request`,

      "validation.name": `Please enter your name.`,
      "validation.email": `Please enter a valid email address.`,
      "validation.phone": `Please enter a valid phone number.`,
      "validation.address": `Please enter a shipping address.`,
      "validation.carModel": `Please tell us the make, model, and year.`,
      "validation.details": `Please add a few more details.`,
      "form.errorNote": `Please fix the highlighted fields and try again.`,
      "form.success": `Thanks — your request has been sent. We'll get back to you soon.`,
      "form.sending": `Sending...`,
      "form.submitError": `Something went wrong sending your request. Please try again, or email us directly at 2lifeparts@gmail.com.`,

      "footer.tagline": `3D printed parts for classic cars and padel accessories for clubs.`,
      "footer.copy": `All rights reserved. Manufacturer names are used to describe compatibility only.`
    },

    id: {
      "meta.title": `2LIFE | Suku Cadang Otomotif & Aksesori Padel Cetak 3D`,
      "meta.description": `2LIFE merekayasa balik dan mencetak 3D suku cadang plastik rapuh yang sudah tidak diproduksi untuk mobil klasik Eropa: klip trim, komponen dasbor, rumah lampu, dan lainnya.`,

      "a11y.skipLink": `Langsung ke konten`,
      "a11y.logoHome": `Beranda 2LIFE`,
      "a11y.navToggle": `Buka/tutup menu`,
      "a11y.statsLabel": `Statistik utama`,

      "nav.services": `Layanan`,
      "nav.process": `Proses`,
      "nav.parts": `Suku Cadang`,
      "nav.materials": `Material`,
      "nav.about": `Tentang Kami`,
      "nav.contact": `Kontak`,

      "header.cta": `Minta Penawaran`,

      "hero.eyebrow": `Cetak 3D &middot; Presisi &middot; Jakarta`,
      "hero.headline": `<span>Suku cadang mobil langka.</span> <span>Aksesori padel kustom.</span> <span>Dicetak presisi.</span>`,
      "hero.sub": `2LIFE membuat ulang komponen plastik rapuh yang sudah tidak diproduksi pabrikan mobil klasik Eropa, serta membuat holder raket dan aksesori lapangan untuk klub padel, lengkap dengan logo Anda.`,
      "hero.cta1": `Suku Cadang Otomotif`,
      "hero.cta2": `Aksesori Padel`,
      "hero.tagMore": `+ lainnya`,

      "stats.label1": `Suku cadang dicetak`,
      "stats.label2": `Model didukung`,
      "stats.label3": `Rata-rata pengerjaan`,
      "stats.label4": `Toleransi cetak`,

      "services.eyebrow": `Apa yang kami lakukan`,
      "services.title": `Dari komponen asli yang rusak menjadi pengganti hasil cetak`,
      "services.sub": `Setiap suku cadang dibuat ulang mengikuti bentuk asli Anda, bukan cetakan generik.`,
      "services.card1.title": `Pemindaian 3D`,
      "services.card1.body": `Kami mendigitalkan suku cadang Anda yang rusak atau aus dengan pemindaian structured-light presisi, menangkap setiap lekukan dan titik pemasangan.`,
      "services.card2.title": `Rekonstruksi CAD`,
      "services.card2.body": `Bagian yang rusak diperbaiki secara digital dan dimodelkan sesuai geometri serta toleransi aslinya sebelum dicetak.`,
      "services.card3.title": `Pencetakan Presisi`,
      "services.card3.body": `Dicetak lapis demi lapis menggunakan material tahan UV dan benturan, disesuaikan dengan fungsi asli suku cadang di balik kap mesin atau dasbor.`,
      "services.card4.title": `Pengecekan & Penyelesaian Akhir`,
      "services.card4.body": `Setiap suku cadang diamplas, diwarnai agar serasi, dan diuji pemasangan kering sesuai gambar acuan sebelum dikirim ke Anda.`,

      "process.eyebrow": `Prosesnya`,
      "process.title": `Empat langkah dari retak menjadi utuh kembali`,
      "process.step1.title": `Kirimkan suku cadangnya`,
      "process.step1.body": `Kirimkan komponen asli Anda (meski dalam kondisi pecah) atau foto yang jelas beserta ukurannya, serta merek, model, dan tahun mobil Anda.`,
      "process.step2.title": `Kami memodelkannya`,
      "process.step2.body": `Tim kami memindai dan merekonstruksi suku cadang dalam CAD, mengembalikan geometri yang aus atau hilang sesuai spesifikasi.`,
      "process.step3.title": `Kami cetak & selesaikan`,
      "process.step3.body": `Dicetak dengan material tahan lama yang sesuai, lalu dibersihkan, difinishing, dan diperiksa kualitasnya secara manual.`,
      "process.step4.title": `Dikirim sampai ke pintu rumah Anda`,
      "process.step4.body": `Suku cadang baru Anda dikirim ke seluruh dunia, siap dipasang, dengan file digital kami simpan untuk pemesanan ulang.`,

      "parts.eyebrow": `Yang paling sering diperbaiki`,
      "parts.title": `Suku cadang kecil, masalah besar: teratasi`,
      "parts.sub": `Jika komponennya rapuh, sudah tidak diproduksi, atau dihargai selangit oleh dealer, kemungkinan besar kami bisa mencetaknya.`,
      "parts.tile1": `Klip dasbor`,
      "parts.tile2": `Trim & list`,
      "parts.tile3": `Rumah lampu belakang`,
      "parts.tile4": `Braket interior`,
      "parts.tile5": `Kenop & tuas`,
      "parts.tile6": `Komponen grille`,
      "parts.tile7": `Ventilasi AC`,
      "parts.tile8": `Bingkai saklar`,
      "parts.tile9": `Komponen gagang pintu`,
      "parts.tile10": `Sisipan konsol`,
      "parts.tile11": `Dudukan emblem`,
      "parts.tile12": `Kustom / lainnya`,

      "materials.eyebrow": `Material`,
      "materials.title": `Disesuaikan dengan kebutuhan, bukan satu ukuran untuk semua`,
      "materials.card1.title": `ASA / ABS`,
      "materials.card1.tag": `Tahan UV & panas`,
      "materials.card1.body": `Pilihan utama kami untuk komponen eksterior dan dasbor, mampu mempertahankan warna dan bentuk di bawah terik matahari dan panas ruang mesin.`,
      "materials.card2.title": `Nilon Diperkuat`,
      "materials.card2.tag": `Kekuatan benturan tinggi`,
      "materials.card2.body": `Digunakan untuk braket dan klip yang menerima tekanan atau getaran berulang, lebih kuat dari komponen asli pabrik.`,
      "materials.card3.title": `Resin (SLA)`,
      "materials.card3.tag": `Hasil akhir detail halus`,
      "materials.card3.body": `Untuk emblem, bingkai saklar, dan trim yang membutuhkan tepi tajam serta permukaan halus siap cat.`,

      "about.eyebrow": `Mengapa 2LIFE`,
      "about.title": `Menjaga mobil klasik Eropa tetap di jalan`,
      "about.p1": `Persediaan suku cadang untuk mobil buatan sebelum tahun 2000-an semakin menipis. Dealer berhenti menyetok, pemasok berhenti membuat cetakannya, dan plastik yang tersisa semakin rapuh dimakan usia. Kami membangun 2LIFE untuk menjawab persoalan itu: toko suku cadang cetak sesuai pesanan, dalam jumlah kecil, untuk komponen yang sudah tidak dibuat siapa pun lagi.`,
      "about.p2": `Setiap pesanan dimulai dari suku cadang Anda, bukan dari katalog, sehingga hasil yang Anda terima pas seperti aslinya, termasuk celah panelnya.`,
      "about.point1.strong": `Tanpa jumlah minimum pesanan.`,
      "about.point1.text": `Kami mencetak satu klip saja sama siapnya seperti satu set trim lengkap.`,
      "about.point2.strong": `File tersimpan dalam arsip.`,
      "about.point2.text": `Pesan ulang suku cadang hanya dalam hitungan detik jika rusak lagi.`,
      "about.point3.strong": `Pengiriman ke seluruh dunia.`,
      "about.point3.text": `Suku cadang yang kecil dan ringan bisa dikirim dengan biaya terjangkau ke hampir semua tempat.`,
      "about.point4.strong": `Dijalankan oleh sesama pemilik & penggemar mobil klasik.`,
      "about.point4.text": `Kami juga merestorasi mobil klasik kami sendiri.`,

      "testimonials.eyebrow": `Dari bengkel pelanggan`,
      "testimonials.title": `Pemilik mobil yang menemukan suku cadang yang sulit dicari`,
      "testimonials.quote1": `"Akhirnya menemukan klip ventilasi dasbor untuk W123 saya yang sudah lima belas tahun tidak diproduksi lagi. Langsung pas di percobaan pertama."`,
      "testimonials.quote2": `"Saya kirim sekantong klip trim yang hancur dari 2002tii saya. Hasilnya satu set lengkap, lebih kuat dari aslinya."`,
      "testimonials.quote3": `"Penawaran harga rumah lampu belakang dari dealer benar-benar tidak masuk akal. 2LIFE mencetaknya dengan biaya jauh lebih murah."`,

      "contact.eyebrow": `Hubungi kami`,
      "contact.title": `Ceritakan kebutuhan Anda`,
      "contact.sub": `Untuk suku cadang mobil, sertakan merek, model, dan tahun mobil Anda. Untuk produk padel, sebutkan produk dan jumlahnya. Kami akan membalas dengan penawaran harga dan estimasi waktu pengerjaan, biasanya dalam satu hari kerja.`,
      "contact.shipping": `Melayani pengiriman ke seluruh dunia, berbasis di Jakarta, Indonesia`,

      "nav.automotive": `Otomotif`,
      "nav.sports": `Olahraga`,
      "divisions.go": `Lihat →`,
      "divisions.auto.label": `Otomotif`,
      "divisions.auto.kicker": `Divisi 01`,
      "divisions.auto.text": `Komponen interior dan trim mobil klasik yang sudah tidak diproduksi, dibuat ulang dari komponen asli Anda.`,
      "divisions.auto.sub": `Suku cadang pengganti hasil rekayasa ulang untuk mobil klasik Eropa.`,
      "divisions.sports.label": `Olahraga`,
      "divisions.sports.kicker": `Divisi 02`,
      "divisions.sports.text": `Holder raket padel, aksesori lapangan, dan produk dengan logo kustom untuk klub.`,
      "divisions.sports.sub": `Aksesori padel cetak 3D untuk klub, lapangan, dan pemain, dirancang dan dibuat di Jakarta.`,
      "sports.eyebrow": `Produk padel`,
      "sports.title": `Dibuat untuk lapangan, dengan logo klub Anda`,
      "sports.sub": `Produk praktis untuk merapikan raket, tas, dan ponsel, tersedia dengan logo klub Anda.`,
      "sports.soon": `Segera hadir`,
      "sports.p1.title": `Holder Raket Indoor`,
      "sports.p1.body": `Holder dinding yang menjaga raket tetap rapi dan terpajang di lounge, pro shop, dan area loker.`,
      "sports.p2.title": `Holder Raket Outdoor`,
      "sports.p2.body": `Versi untuk pinggir lapangan yang tahan panas dan lembap, jadi pemain punya tempat aman untuk raket di sela permainan.`,
      "sports.p3.title": `Holder Tas`,
      "sports.p3.body": `Menjaga tas padel tidak tergeletak di lantai, sehingga area sekitar lapangan lebih lega.`,
      "sports.p4.title": `Holder Ponsel Lapangan`,
      "sports.p4.body": `Dipasang di net dan memuat dua ponsel, masing-masing menghadap satu sisi, untuk merekam pertandingan.`,
      "sports.p5.title": `Dispenser Bola`,
      "sports.p5.body": `Tabung yang bisa diisi ulang dan dikaitkan ke pagar lapangan, agar bola cadangan selalu mudah dijangkau.`,
      "sports.p6.title": `Branding Klub Kustom`,
      "sports.p6.body": `Setiap produk bisa diberi logo atau nama klub Anda, untuk satu lapangan atau semua cabang.`,
      "sports.ctaText": `Mengelola klub atau beberapa cabang? Tanyakan harga khusus dan kustomisasi logo.`,
      "sports.ctaBtn": `Minta Harga Klub`,
      "form.category": `Apa yang Anda butuhkan?`,
      "form.categoryAuto": `Suku cadang otomotif`,
      "form.categorySports": `Produk olahraga / padel`,
      "form.carModelSports": `Nama klub atau venue (opsional)`,
      "form.carModelPlaceholderSports": `cth. nama klub atau lapangan Anda`,
      "form.detailsSports": `Produk apa saja, dan berapa banyak?`,
      "form.detailsPlaceholderSports": `Produk, jumlah, jumlah lapangan atau cabang, dan apakah ingin memakai logo Anda...`,
      "nav.howItWorks": `Cara Kerja`,
      "nav.support": `Bantuan`,
      "support.eyebrow": `Bantuan`,
      "support.title": `Ada pertanyaan sebelum memesan?`,
      "support.sub": `Jawaban singkat ada di bawah. Untuk hal lain, hubungi kami langsung; biasanya kami membalas dalam satu hari kerja.`,
      "support.email": `Email`,
      "support.call": `Telepon`,
      "support.q1": `Bagaimana cara mendapatkan penawaran harga?`,
      "support.a1": `Isi formulir penawaran kami atau kirim pesan WhatsApp beserta foto komponen atau produk yang Anda butuhkan. Kami akan membalas dengan harga dan estimasi waktu pengerjaan, biasanya dalam satu hari kerja.`,
      "support.q2": `Apakah bisa membuat suku cadang hanya dari foto?`,
      "support.a2": `Sering kali bisa, asalkan fotonya jelas dan disertai ukuran. Untuk komponen yang rumit, mengirim komponen aslinya (meski sudah rusak) memberi hasil yang paling pas.`,
      "support.q3": `Apakah melayani pengiriman ke luar Indonesia?`,
      "support.a3": `Ya. Kami berbasis di Jakarta dan mengirim ke seluruh dunia.`,
      "support.q4": `Apakah ada minimal pemesanan?`,
      "support.a4": `Tidak ada. Kami siap mencetak satu klip maupun satu set lengkap. Klub padel yang memesan untuk beberapa lapangan atau cabang bisa menanyakan harga khusus.`,
      "support.q5": `Apakah logo klub kami bisa dipasang pada produk padel?`,
      "support.a5": `Bisa. Semua produk olahraga kami dapat diberi logo atau nama klub Anda.`,
      "support.q6": `Bagaimana jika komponennya rusak lagi?`,
      "support.a6": `Kami menyimpan file digitalnya, jadi pemesanan ulang cepat dan hasilnya sama pas seperti sebelumnya.`,
      "nav.home": `Beranda`,
      "meta.title.automotive": `Suku Cadang Otomotif | 2LIFE`,
      "meta.title.sports": `Aksesori Padel | 2LIFE`,
      "meta.title.support": `Bantuan | 2LIFE`,
      "meta.title.quote": `Minta Penawaran | 2LIFE`,
      "cta.automotive.text": `Punya komponen yang sudah tidak diproduksi atau retak? Kirimkan detailnya.`,
      "cta.automotive.btn": `Minta Suku Cadang`,
      "cta.general.text": `Siap memesan atau masih ada pertanyaan? Ceritakan kebutuhan Anda.`,
      "cta.general.btn": `Minta Penawaran`,
      "hero.dim": `diukur dari komponen asli Anda`,
      "a11y.whatsapp": `Chat dengan kami di WhatsApp`,
      "facts.f1.title": `Tanpa minimal pesanan`,
      "facts.f1.text": `Satu klip atau satu set lengkap.`,
      "facts.f2.title": `File disimpan`,
      "facts.f2.text": `Pesanan ulang sama pasnya.`,
      "facts.f3.title": `Logo klub Anda`,
      "facts.f3.text": `Di semua produk padel.`,
      "facts.f4.title": `Kirim ke seluruh dunia`,
      "facts.f4.text": `Dari workshop kami di Jakarta.`,
      "bench.title": `Revisi demi revisi hingga pas seperti aslinya`,
      "bench.body": `Bezel ventilasi AC kami melewati lebih dari 170 revisi desain sebelum kami puas dengan cara pemasangannya. Setiap komponen mendapat ketelitian yang sama: kami terus menyesuaikan sampai pas seperti komponen pabrikan.`,
      "gallery.title": `Sebelum dan sesudah`,
      "form.name": `Nama`,
      "form.email": `Email`,
      "form.phone": `Nomor telepon`,
      "form.phonePlaceholder": `cth. 0812-3456-7890`,
      "form.carModel": `Merek / model / tahun mobil`,
      "form.carModelPlaceholder": `cth. Porsche 911 (1986)`,
      "form.address": `Alamat pengiriman`,
      "form.addressPlaceholder": `Jalan, kota, kode pos, negara`,
      "form.details": `Deskripsikan suku cadangnya`,
      "form.detailsPlaceholder": `Letaknya di mana, bagaimana kerusakannya, ukuran yang Anda miliki...`,
      "form.photoHint": `Perlu mengirim foto atau video? Formulir ini belum bisa menerima lampiran, jadi kirim ke <a href="mailto:2lifeparts@gmail.com">2lifeparts@gmail.com</a> atau hubungi kami langsung di <a href="tel:+6281615555777">+62 816-1555-5777</a>.`,
      "form.submit": `Kirim Permintaan`,

      "validation.name": `Silakan masukkan nama Anda.`,
      "validation.email": `Silakan masukkan alamat email yang valid.`,
      "validation.phone": `Silakan masukkan nomor telepon yang valid.`,
      "validation.address": `Silakan masukkan alamat pengiriman.`,
      "validation.carModel": `Silakan cantumkan merek, model, dan tahun mobil.`,
      "validation.details": `Mohon tambahkan sedikit detail lagi.`,
      "form.errorNote": `Mohon perbaiki kolom yang ditandai lalu coba lagi.`,
      "form.success": `Terima kasih — permintaan Anda telah terkirim. Kami akan segera menghubungi Anda.`,
      "form.sending": `Mengirim...`,
      "form.submitError": `Terjadi kesalahan saat mengirim permintaan Anda. Silakan coba lagi, atau kirim email langsung ke 2lifeparts@gmail.com.`,

      "footer.tagline": `Suku cadang cetak 3D untuk mobil klasik dan aksesori padel untuk klub.`,
      "footer.copy": `Hak cipta dilindungi. Nama pabrikan digunakan hanya untuk menjelaskan kompatibilitas.`
    }
  };

  function getSavedLang() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveLang(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable (private mode, etc.) - language just won't persist */
    }
  }

  function t(key) {
    var lang = window.i18n.currentLang;
    var dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    return Object.prototype.hasOwnProperty.call(TRANSLATIONS.en, key) ? TRANSLATIONS.en[key] : key;
  }

  function applyTranslations(lang) {
    if (!TRANSLATIONS[lang]) lang = "en";
    window.i18n.currentLang = lang;
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });

    var page = document.documentElement.getAttribute("data-page");
    var pageTitleKey = "meta.title." + page;
    document.title = (page && t(pageTitleKey) !== pageTitleKey) ? t(pageTitleKey) : t("meta.title");
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("meta.description"));

    document.querySelectorAll(".lang-switch-btn").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function setLang(lang) {
    saveLang(lang);
    applyTranslations(lang);
  }

  window.i18n = {
    currentLang: "en",
    t: t,
    setLang: setLang
  };

  function init() {
    var gate = document.getElementById("langGate");
    var saved = getSavedLang();

    if (saved && TRANSLATIONS[saved]) {
      applyTranslations(saved);
    } else {
      /* First visit: follow the browser's language instead of asking */
      var prefs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || "en"];
      var detected = prefs.some(function (l) { return /^(id|in)\b/i.test(l); }) ? "id" : "en";
      applyTranslations(detected);
    }

    if (gate) {
      gate.querySelectorAll("[data-lang]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var lang = btn.getAttribute("data-lang");
          setLang(lang);
          document.documentElement.classList.remove("lang-gate-open");
          gate.classList.add("is-hidden");
          window.setTimeout(function () {
            gate.classList.remove("is-open");
          }, 300);
        });
      });
    }

    document.querySelectorAll(".lang-switch-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });
  }

  init();
})();
