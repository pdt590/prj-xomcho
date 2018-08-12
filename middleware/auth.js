export default function(context) {
    if (!context.store.state.users.user) {
        context.redirect('/')
    }
}