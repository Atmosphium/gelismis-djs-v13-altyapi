const log = (İçerik) => console.log (İçerik)

// Uygulama Yapılandırması

const { Client, Intents, Collection, MessageEmbed, CommandInteraction } = require ('discord.js'),
      FS = require ('fs')

const Uygulama = new Client ({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

Uygulama.bilgi = {
    ad: '', // Bot adı
    kimlik: '', // Bot ID'si
    anahtar: '', // Bot token'ı
    dernek: '', // Botun ana (bot yaratıcısının tam yetkili olduğu) derneğinin (sunucusunun) ID'si
    tanrı: '' // Bot yaratıcısının ID'si
}

Uygulama.komutlar = new Collection ()
Uygulama.komutKimlikleri = new Collection ()
Uygulama.yetkilendirme = new Collection ()

Uygulama.login (Uygulama.bilgi.anahtar)

Uygulama.on ('ready', () => {
    log (`${Uygulama.bilgi.ad} başarıyla etkinleştirildi!`)

    // Komutların Yüklenmesi

    FS.readdir ('./cmd/', (Yanlış, Belgeler) => {
        if (Yanlış) return

        Belgeler.forEach (Belge => {
            const Komut = require (`./cmd/${Belge}`)

            Uygulama.application?.commands?.create ({
                name: Komut.yapılandırma.ad,
                nameLocalizations: Komut.yapılandırma.yerelAdlar,
                description: Komut.yapılandırma.açıklama,
                descriptionLocalizations: Komut.yapılandırma.yerelAçıklamalar,
                options: Komut.yapılandırma.seçenekler
            }).then (eklenenKomut => {
                Uygulama.komutKimlikleri.set (eklenenKomut.name, eklenenKomut.id)
                Uygulama.yetkilendirme.set (eklenenKomut.id, Komut.yapılandırma.yetki)
            })

            Uygulama.komutlar.set (Komut.yapılandırma.ad, Belge)
        })
    })
})

// Komutların Çalıştırılması

Uygulama.on ('interactionCreate', Etkileşim => {
    const Hata = (Mesaj) => {
        Etkileşim.reply ({
            embeds: [
                new MessageEmbed ({
                    color: 'DARK_RED',
                    title: ':exclamation: Achtung! Achtung!',
                    description: Mesaj
                })
            ],
            ephemeral: true
        })
    }

    if (!Etkileşim.isCommand ()) return
    if (!Etkileşim.guild) return Hata ('Bu uygulama yalnızca dernekler içindir ekselansları/majesteleri.')

    const { guildId, memberPermissions, user, commandName, commandId, options } = Etkileşim,
          [ dernekKimliği, üyeYetkileri, Kullanıcı, komutAdı, komutKimliği, Seçenekler ] = [ guildId, memberPermissions, user, commandName, commandId, options ]

    const komutDosyası = require ('./cmd/' + Uygulama.komutlar.get (komutAdı))

    if (Uygulama.komutlar.has (komutAdı)) {
        if (dernekKimliği == Uygulama.bilgi.dernek && Uygulama.yetkilendirme.get (komutKimliği) == 'GOD_TIER') {
            if (Kullanıcı.id !== Uygulama.bilgi.tanrı) return Hata ('Bunu söylemekten dolayı hayli müteessirim efendim, lakin mevzubahis eylemi gerçekleştirmek için gerekli salahiyetlere maalesef ki iye değilsiniz.')

            return komutDosyası.eylem (Uygulama, Etkileşim, Seçenekler)
        }

        if (!üyeYetkileri.has (Uygulama.yetkilendirme.get (komutKimliği))) return Hata ('Bunu söylemekten dolayı hayli müteessirim efendim, lakin mevzubahis eylemi gerçekleştirmek için gerekli salahiyetlere maalesef ki iye değilsinizz.')

        return komutDosyası.eylem (Uygulama, Etkileşim, Seçenekler)
    }
})

require ('./templates/texts/an')