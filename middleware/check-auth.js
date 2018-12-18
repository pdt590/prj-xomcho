export default function( context ) {
    process.client ? context.store.dispatch('initAuth') : ``
}