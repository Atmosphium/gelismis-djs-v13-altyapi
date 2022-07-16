module.exports = {
    emb: {
        err: (Uygulama, Etkileşim, İçerik) => require ('./embeds/başarısız') (Uygulama, Etkileşim, İçerik),
        suc: (Uygulama, Etkileşim, İçerik) => require ('./embeds/başarılı') (Uygulama, Etkileşim, İçerik),
        inf: (Uygulama, komutBaşlığı, Etkileşim, İçerik) => require ('./embeds/bilgi') (Uygulama, komutBaşlığı, Etkileşim, İçerik)
    },
    txt: {
        mmt: require ('./texts/an')
    }
}