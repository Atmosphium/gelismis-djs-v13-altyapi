exports.eylem = (Uygulama, Etkileşim, Seçenekler) => {
    Uygulama.application?.commands.fetch (Seçenekler.get ('kimlik').value).then (Komut => {
        Komut.delete ().then (() => {
            Etkileşim.reply (`${Komut.name}`)
        })
    })
}

exports.yapılandırma = {
    başlık: 'Komut Silme',
    ad: 'komutsil',
    yerelAdlar: {
        'en-US': 'delcmd',
        'en-GB': 'delcmd',
        'ru': 'удаликомманду',
        'tr': 'komutsil'
    },
    açıklama: 'Belirttiğiniz komutu silersiniz.',
    yerelAçıklamalar: {
        'en-US': 'Delete the specified command.',
        'en-GB': 'Delete the specified command.',
        'ru': 'Удалить определявшую комманду.',
        'tr': 'Belirttiğiniz komutu silersiniz.'
    },
    seçenekler: [
        {
            type: 'STRING',
            name: 'kimlik',
            description: 'Tahtalıköyü boylayacak komutun kimliği (bkz. /komutkimlik).',
            descriptionLocalizations: {
                'en-US': 'The ID of the command that will be removed.',
                'en-GB': 'The ID of the command that will be removed.',
                'ru': 'Удостоверение комманды которой будет удалена.',
                'tr': 'Tahtalıköyü boylayacak komutun kimliği (bkz. /komutkimlik).'
            },
            required: true
        }
    ],
    yetki: 'GOD_TIER'
}