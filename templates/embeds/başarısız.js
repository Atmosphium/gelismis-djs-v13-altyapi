const { txt } = require ('../şablonlar')

const { MessageEmbed } = require ('discord.js')

module.exports = (Uygulama, Etkileşim, İçerik) => new MessageEmbed ({
    color: 'DARK_RED',
    author: {
        name: `${Etkileşim.user.tag} tarafından kullanıldı`,
        iconURL: Etkileşim.member.displayAvatarURL ()
    },
    title: ':exclamation: Achtung! Achtung!',
    description: İçerik,
    footer: {
        text: Uygulama.bilgi.ad + ' • ' + txt.mmt,
        iconURL: Uygulama.user.displayAvatarURL ()
    },
    ephemeral: true
})