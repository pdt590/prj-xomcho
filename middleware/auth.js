export default function(context) {
    if (!context.store.getters.user) {
        context.redirect('/') //TODO: Fix issue: auth-user disappears when refresh a page & store auth-user at server side when refreshing
    }
}