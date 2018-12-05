<template>
    <section>
        <div class="block">
             <button class="button is-dark">
                <b-icon icon="check"></b-icon>
                <span>Finish</span>
            </button>

            <button class="button is-warning">
                <b-icon icon="check"></b-icon>
                <span>Finish</span>
            </button>
        </div>
        <div class="block">
            <h6>Material Design Icons</h6>
            <div class="block">
                <b-icon icon="link"></b-icon>
                <b-icon icon="logout"></b-icon>
                <b-icon
                    icon="account"
                    size="is-medium">
                </b-icon>
                <b-icon
                    icon="home"
                    size="is-medium">
                </b-icon>
                <b-icon
                    icon="view-dashboard"
                    size="is-medium">
                </b-icon>
            </div>
            <h6>FontAwesome</h6>
            <div class="block">
                <b-icon
                    pack="fas"
                    icon="user"
                    size="is-medium">
                </b-icon>
                <b-icon
                    pack="fas"
                    icon="home"
                    size="is-medium">
                </b-icon>
                <b-icon
                    pack="fas"
                    icon="tachometer-alt"
                    size="is-medium">
                </b-icon>
                <h6>Default Bulma</h6>
                <span class="icon">
                    <i class="material-icons">face</i>
                    <i class="material-icons">&#xE87C;</i>
                </span>
            </div>
        </div>
        <div class="block">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
                    </a>

                    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item">
                            Home
                        </a>

                        <a class="navbar-item">
                            Documentation
                        </a>

                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link is-arrowless">
                            More
                            </a>

                            <div class="navbar-dropdown">
                                <a class="navbar-item">
                                    About
                                </a>
                                <a class="navbar-item">
                                    Jobs
                                </a>
                                <a class="navbar-item">
                                    Contact
                                </a>
                                <hr class="navbar-divider">
                                <a class="navbar-item">
                                    Report an issue
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="navbar-end">
                        <div class="navbar-item">
                                <div class="buttons">
                                <a class="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                                <a class="button is-light">
                                    Log in
                                </a>
                                </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <div class="block">
            <b-field label="Name">
                <b-input v-model="name"></b-input>
            </b-field>

            <b-field label="Email"
                type="is-danger"
                message="This email is invalid">
                <b-input type="email"
                    value="john@"
                    maxlength="30">
                </b-input>
            </b-field>

            <b-field label="Username"
                type="is-success"
                message="This username is available">
                <b-input value="johnsilver" maxlength="30"></b-input>
            </b-field>

            <b-field label="Password">
                <b-input type="password"
                    value="iwantmytreasure"
                    password-reveal>
                </b-input>
            </b-field>

            <b-field label="Message">
                <b-input maxlength="200" type="textarea"></b-input>
            </b-field>
        </div>
        <div class="block">
            <a class="button is-primary is-large">Primary</a>
            <a class="button is-link is-large">Link</a>
            <a class="button is-info">Info</a>
            <a class="button is-success">Success</a>
            <a class="button is-warning">Warning</a>
            <a class="button is-danger">Danger</a>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                name: 'John Silver'
            }
        }
    }
</script>