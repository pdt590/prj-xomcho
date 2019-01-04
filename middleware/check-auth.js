export default async function( context ) {
    process.client ? await context.store.dispatch('initAuth') : ``
}