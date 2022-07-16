const { txt } = require ('../şablonlar')

const { MessageEmbed } = require ('discord.js')

module.exports = (Uygulama, komutBaşlığı, Etkileşim, İçerik) => new MessageEmbed ({
    color: 'BLURPLE',
    author: {
        name: `${Etkileşim.user.tag} tarafından kullanıldı`,
        iconURL: Etkileşim.member.displayAvatarURL ()
    },
    title: komutBaşlığı,
    description: İçerik,
    footer: {
        text: Uygulama.bilgi.ad + ' • ' + txt.mmt,
        iconURL: Uygulama.user.displayAvatarURL ()
    },
    ephemeral: true
})