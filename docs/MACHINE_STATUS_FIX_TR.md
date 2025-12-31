# Makine Durumu ve Widget Düzeltmesi

## Sorun

Machines (Makineler) sayfasında yer alan widgetlar hep 0 değerini gösteriyordu ve makine durumu sütununda "Not Started" yazıyordu, ancak makine aktif olmasına rağmen bu durum yansımıyordu.

## Kök Neden

Keygen API'si makine durumunu (heartbeatStatus) büyük harflerle döndürüyor:
- `NOT_STARTED` - Hiç başlatılmamış
- `ALIVE` - Aktif/Çevrimiçi
- `DEAD` - Çevrimdışı
- `RESURRECTED` - Yeniden canlandırılmış

Ancak kodumuzda küçük harflerle karşılaştırma yapılıyordu:
- `'alive'`
- `'dead'`
- `'not-started'`

Bu durum, string karşılaştırmalarının başarısız olmasına neden oldu ve widget sayıları ile filtreleme düzgün çalışmadı.

## Çözüm

Bu düzeltme, PR #12'deki lisans durumu düzeltmesine benzer şekilde uygulandı.

### Yapılan Değişiklikler

1. **Tip Tanımları** (`src/lib/types/keygen.ts`)
   - `Machine` interface'indeki `heartbeatStatus` tipi büyük harfli enum değerlerine güncellendi
   - `RESURRECTED` durumu için destek eklendi

2. **Makine Yönetimi Bileşeni** (`src/components/machines/machine-management.tsx`)
   - Tüm durum karşılaştırmaları büyük harfli değerleri kullanacak şekilde güncellendi
   - Widget hesaplamaları düzeltildi:
     - **Total Machines**: Tüm makinelerin sayısı
     - **Active**: `ALIVE` ve `RESURRECTED` durumundaki makineler
     - **Offline**: `DEAD` durumundaki makineler (etiket "Inactive"den "Offline"a değiştirildi)
     - **Not Started**: `NOT_STARTED` durumundaki makineler
   - Durum renkleri ve ikonları büyük harfli değerler için güncellendi
   - `formatStatusText()` yardımcı fonksiyonu eklendi:
     - `ALIVE` → "Active"
     - `DEAD` → "Offline"
     - `NOT_STARTED` → "Not Started"
     - `RESURRECTED` → "Resurrected"

### API Yanıt Yapısı

```json
{
  "data": {
    "type": "machines",
    "attributes": {
      "heartbeatStatus": "NOT_STARTED",  // Büyük harf + alt çizgi
      "requireHeartbeat": false,
      "heartbeatDuration": 600,
      "lastHeartbeat": null,
      "nextHeartbeat": null
    }
  }
}
```

## Test Sonuçları

- ✅ Kod Next.js dev sunucusuyla başarıyla derlendi
- ✅ TypeScript tip kontrolü başarılı
- ✅ Tüm durum karşılaştırmaları API yanıt formatıyla eşleşiyor
- ✅ CodeQL güvenlik taraması temiz (0 güvenlik açığı)
- ✅ Kod incelemesi tamamlandı ve geri bildirimler uygulandı

## Kullanım

Düzeltmeden sonra:

1. **Widget Sayıları**: Artık doğru değerleri gösteriyor
   - Aktif makineler sayılıyor
   - Çevrimdışı makineler sayılıyor
   - Başlatılmamış makineler sayılıyor

2. **Durum Sütunu**: Makinelerin gerçek durumunu gösteriyor
   - Aktif makineler yeşil "Active" badge ile
   - Çevrimdışı makineler kırmızı "Offline" badge ile
   - Başlatılmamış makineler gri "Not Started" badge ile

3. **Filtreleme**: Durum filtreleri artık doğru çalışıyor
   - "Active" filtresi → `ALIVE` ve `RESURRECTED` makineleri gösterir
   - "Inactive" filtresi → `DEAD` makineleri gösterir
   - "Not Started" filtresi → `NOT_STARTED` makineleri gösterir

## İlgili Değişiklikler

Bu düzeltme PR #12'deki lisans durumu düzeltmesiyle tutarlıdır, burada da benzer şekilde API'nin döndürdüğü büyük harfli durum değerleri kullanıldı.

## Notlar

- Keygen API'si genellikle enum değerlerini büyük harflerle (UPPER_CASE) döndürür
- Gelecekteki geliştirmelerde API yanıt formatına dikkat edilmeli
- TypeScript tip tanımları her zaman API dokümantasyonuyla eşleşmeli
