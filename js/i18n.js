(function () {
  "use strict";

  var STORAGE_KEY = "2life_lang";

  var TRANSLATIONS = {
    en: {
      "meta.title": `2LIFE | 3D Printed Parts for Classic European Cars`,
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

      "hero.eyebrow": `Reverse-engineered &middot; 3D printed &middot; Made to fit`,
      "hero.headline": `Broken clip. Cracked trim. <span class="text-orange">Discontinued forever.</span><br>Not anymore.`,
      "hero.sub": `2LIFE scans, models, and 3D prints the fragile plastic parts your classic European car's manufacturer stopped making decades ago: dashboard clips, trim, housings, brackets, and more.`,
      "hero.cta1": `Request a Part`,
      "hero.cta2": `See How It Works`,
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
      "contact.title": `Tell us about your part`,
      "contact.sub": `Include your car's make, model and year, and a photo or two if you have them. We'll reply with a quote and turnaround time, usually within one business day.`,
      "contact.shipping": `Ships worldwide, based in Jakarta, Indonesia`,

      "form.name": `Name`,
      "form.email": `Email`,
      "form.carModel": `Car make / model / year`,
      "form.carModelPlaceholder": `e.g. Porsche 911 (1986)`,
      "form.details": `Describe the part`,
      "form.detailsPlaceholder": `Where it's located, how it broke, any measurements you have...`,
      "form.photo": `Photo (optional)`,
      "form.submit": `Send Request`,

      "validation.name": `Please enter your name.`,
      "validation.email": `Please enter a valid email address.`,
      "validation.carModel": `Please tell us the make, model, and year.`,
      "validation.details": `Please add a few more details about the part.`,
      "form.errorNote": `Please fix the highlighted fields and try again.`,
      "form.success": `Thanks, your request has been noted. We'll reply by email with a quote shortly.`,

      "footer.tagline": `3D printed parts for classic European cars.`,
      "footer.copy": `All rights reserved. Manufacturer names are used to describe compatibility only.`
    },

    id: {
      "meta.title": `2LIFE | Suku Cadang Cetak 3D untuk Mobil Klasik Eropa`,
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

      "hero.eyebrow": `Direkayasa balik &middot; Dicetak 3D &middot; Dibuat pas`,
      "hero.headline": `Klip patah. Trim retak. <span class="text-orange">Sudah berhenti diproduksi.</span><br>Sekarang bukan masalah lagi.`,
      "hero.sub": `2LIFE memindai, memodelkan, dan mencetak 3D suku cadang plastik rapuh yang sudah puluhan tahun berhenti diproduksi oleh pabrikan mobil klasik Eropa Anda: klip dasbor, trim, rumah komponen, braket, dan lainnya.`,
      "hero.cta1": `Minta Suku Cadang`,
      "hero.cta2": `Lihat Cara Kerjanya`,
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
      "contact.title": `Ceritakan tentang suku cadang Anda`,
      "contact.sub": `Sertakan merek, model, dan tahun mobil Anda, serta satu atau dua foto jika ada. Kami akan membalas dengan penawaran harga dan estimasi waktu pengerjaan, biasanya dalam satu hari kerja.`,
      "contact.shipping": `Melayani pengiriman ke seluruh dunia, berbasis di Jakarta, Indonesia`,

      "form.name": `Nama`,
      "form.email": `Email`,
      "form.carModel": `Merek / model / tahun mobil`,
      "form.carModelPlaceholder": `cth. Porsche 911 (1986)`,
      "form.details": `Deskripsikan suku cadangnya`,
      "form.detailsPlaceholder": `Letaknya di mana, bagaimana kerusakannya, ukuran yang Anda miliki...`,
      "form.photo": `Foto (opsional)`,
      "form.submit": `Kirim Permintaan`,

      "validation.name": `Silakan masukkan nama Anda.`,
      "validation.email": `Silakan masukkan alamat email yang valid.`,
      "validation.carModel": `Silakan cantumkan merek, model, dan tahun mobil.`,
      "validation.details": `Mohon tambahkan sedikit detail lagi tentang suku cadang ini.`,
      "form.errorNote": `Mohon perbaiki kolom yang ditandai lalu coba lagi.`,
      "form.success": `Terima kasih, permintaan Anda telah kami terima. Kami akan membalas melalui email dengan penawaran harga sesegera mungkin.`,

      "footer.tagline": `Suku cadang cetak 3D untuk mobil klasik Eropa.`,
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

    document.title = t("meta.title");
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
      applyTranslations("en");
      if (gate) {
        gate.classList.add("is-open");
      }
      document.documentElement.classList.add("lang-gate-open");
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
