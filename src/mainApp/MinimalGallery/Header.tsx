import Component from "../../Component";
import { MinimalGalleryState } from ".";
import { push } from "./_actions";
import { updateApplicationBase, signOut, signIn } from "./_actions/base";

interface ComponentState {
    searchTerm: string;
    mobileMenuOpen: boolean;
}

export default class Header extends Component<MinimalGalleryState, ComponentState> {
    constructor(store: __Component.Store) {
        super(store);

        this.state = {
            searchTerm: this.props.filter,
            mobileMenuOpen: false
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    public render() {
        const tsx = this.tsx;
        const config = this.props.base.applicationBaseResult.config;

        const headSearch = config.headerSearch ? (
            <nav
                class="class-top-nav-list header-nav-search"
                role="navigation"
                title="usernav"
            >
                <form class="inline-block padding-leader-half header-search-form" role="search" onsubmit={this.handleSearch}>
                    <input
                        title={config.searchPlaceholder}
                        type="search"
                        placeholder={config.searchPlaceholder}
                        value={this.state.searchTerm}
                        style="margin-top: -1px;"
                        oninput={this.handleSearchChange}
                    />
                    <button type="submit" class="hide">{config.searchPlaceholder}</button>
                </form>
                <a 
                    href="/" 
                    class="icon-ui-menu top-nav-link js-drawer-toggle" 
                    data-drawer="top-nav" 
                    onclick={this.handleMenuClick}
                    style={`color: ${config.headerTextColor}`}
                >
                    <span class="phone-hide no-click">{this.props.base.i18n.header.menu}</span>
                </a>
            </nav>
        ) : null;

        const tabletHeadSearch = config.headerSearch ? (
            <nav class="class-top-nav-list" role="navigation" title="usernav">
                <form class="inline-block padding-leader-half" role="search" onsubmit={this.handleSearch}>
                    <input
                        title={config.searchPlaceholder}
                        type="search"
                        placeholder={config.searchPlaceholder}
                        value={this.state.searchTerm}
                        style="margin-top: -1px;"
                        oninput={this.handleSearchChange}
                    />
                    <button type="submit" class="hide">{config.searchPlaceholder}</button>
                </form>
            </nav>
        ) : null;

        const mobileHeadSearch = config.headerSearch ? (
            <form 
                class="inline-block padding-leader-1 margin-right-1 right" 
                role="search" 
                onsubmit={this.handleSearch} 
                onclick={(e: Event) => { e.stopPropagation(); }}
            >
                <input
                    title={config.searchPlaceholder}
                    type="search"
                    placeholder={config.searchPlaceholder}
                    value={this.state.searchTerm}
                    style="margin-top: -1px;"
                    oninput={this.handleSearchChange}
                />
                <button type="submit" class="hide">{config.searchPlaceholder}</button>
            </form>
        ) : null;

        const headImage = config.headerImage ? (
            <img src={config.headerImageLocation} class="header-image" alt={config.headerText} />
        ) : null;

        const agolLink = config.showAgolLink ? (
            <a
                class="top-nav-link"
                href={appendProtocol(config.agolLinkLocation.replace("${GROUP_ID}", config.group))}
                style={`color: ${config.headerTextColor}`}
                title={config.agolLinkText}
                target="_blank"
                onclick={this.agolLinkHandler}
            >
                {config.agolLinkText}
            </a>
        ) : null;

        let signInLink = null;
        if (
            !this.props.base.applicationBase.portal["credential"] &&
            this.props.base.applicationBaseResult.config.showSignInBtn
        ) {
            signInLink = (
                <button
                    class="top-nav-btn mobile-sign-in"
                    key="sign-in-btn"
                    onclick={this.handleSignIn}
                    style={`color: ${config.headerTextColor}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        style={`
                            fill: currentColor;
                            pointer-events: none;
                            display: inline-block;
                            width: 1em;
                            height: 1em;
                            vertical-align: -0.15em;
                            padding-right: .5em;
                        `}
                    >
                        <path d="M16.005 15.871a5.872 5.872 0 0 0 0-11.742 5.87 5.87 0 1 0 0 11.742zm11.567 7.188C27.27 19.036 20.023 18 16 18c-4.012 0-11.271 1.039-11.573 5.059C4.203 26.11 4.068 28.18 4.02 30h23.96c-.047-1.82-.184-3.891-.407-6.941z" />
                    </svg>
                    {this.props.base.i18n.header.signIn}
                </button>
            );
        } else if (
            this.props.base.applicationBaseResult.config.showSignInBtn &&
            this.props.base.applicationBase.portal.user
        ) {
            signInLink = (
                <button
                    class="top-nav-btn"
                    key="sign-out-btn"
                    onclick={this.handleSignOut}
                    style={`color: ${config.headerTextColor}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        style={`
                            fill: currentColor;
                            pointer-events: none;
                            display: inline-block;
                            width: 1em;
                            height: 1em;
                            vertical-align: -0.15em;
                            padding-right: .5em;
                        `}
                    >
                        <path d="M16.005 15.871a5.872 5.872 0 0 0 0-11.742 5.87 5.87 0 1 0 0 11.742zm11.567 7.188C27.27 19.036 20.023 18 16 18c-4.012 0-11.271 1.039-11.573 5.059C4.203 26.11 4.068 28.18 4.02 30h23.96c-.047-1.82-.184-3.891-.407-6.941z" />
                    </svg>
                    {`${this.props.base.i18n.header.signOut} (${this.props.base.applicationBase.portal.user.username})`}
                </button>
            );
        }

        return (
            <header class="top-nav fade-in" style={`background-color: ${config.headColor}`}>
                <div class="grid-container">
                    <div class="column-24">
                        <div class="tablet-hide">
                            <a href={appendProtocol(config.headerTextURL)} target="_blank">
                                {headImage}
                                <a class="top-nav-title" style={`color: ${config.headerTextColor}`}>
                                    {config.headerText}
                                </a>
                            </a>
                            {headSearch}
                        </div>

                        <div class="tablet-show top-nav-flex">
                            <header class="top-nav-flex-title">
                                <a href={appendProtocol(config.headerTextURL)}>
                                    <a class="top-nav-title" style={`color: ${config.headerTextColor}`}>
                                        {config.headerText}
                                    </a>
                                </a>
                            </header>
                            <span class="phone-hide">{tabletHeadSearch}</span>
                            <nav class="top-nav-flex-list" role="navigation" aria-labelledby="topnav">
                                <a 
                                    href="/" 
                                    class="icon-ui-menu top-nav-link js-drawer-toggle" 
                                    data-drawer="top-nav" 
                                    onclick={this.handleMenuClick}
                                    style={`color: ${config.headerTextColor}`}
                                >
                                    <span class="phone-hide no-click">{this.props.base.i18n.header.menu}</span>
                                </a>
                            </nav>
                        </div>
                    </div>

                </div>
                <div class="drawer drawer-right js-drawer" data-drawer="top-nav" tabindex="0">
                <nav 
                    class="drawer-nav" 
                    role="navigation" 
                    onclick={( e: Event ) => { e.stopPropagation(); }}
                    style={`background-color: ${config.headColor}`}
                >
                    <p class="menu-title" style={`color: ${config.headerTextColor}`}>
                        {this.props.base.i18n.header.menu}
                    </p>
                    <aside class="side-nav">
                        <ul class="drawer-block-list">
                            <li><span class="phone-show">{mobileHeadSearch}</span></li>
                            <li>{agolLink}</li>
                            <li>{signInLink}</li> 
                        </ul>
                    </aside>
                </nav>
                </div>
            </header>
        );
    }

    public componentWillReceiveProps(nextProps: MinimalGalleryState) {
        if (nextProps.filter !== this.state.searchTerm) {   // Set search term based on URL param
            this.setState({ searchTerm: nextProps.filter });
        }
    }

    private handleSearch(e?: Event) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const query = this.state.searchTerm.length > 0 ? `query=${this.state.searchTerm}` : "";
        this.dispatch(push(`${query}`));
    }

    private handleSearchChange(e: any) {
        if (e) {
            e.stopPropagation();
        }
        this.setState({
            searchTerm: e.target.value
        });
        if (e.target.value === "") {
            this.handleSearch();
        }
    }

    private handleSignIn() {
        this.dispatch(signIn());
    }

    private handleSignOut() {
        this.dispatch(signOut());
    }

    private agolLinkHandler(e: Event) {
        e.stopPropagation();
    }

    private handleMenuClick(e: any) {
        // prevent default
        e.preventDefault();
        e.stopPropagation();

        // show/hide nav
        const option = e.target.dataset.drawer;
        const drawer = document.querySelector(`.js-drawer[data-drawer="${option}"]`);
        const html = document.querySelector("html");

        // toggle state
        this.setState({
            mobileMenuOpen: !this.state.mobileMenuOpen
        });

        // open it
        if (this.state.mobileMenuOpen) {
            if ( !!drawer ) {
                drawer.setAttribute("tabindex", "0");
                drawer.classList.add("is-active");
                drawer.addEventListener( "click", this.handleMenuClick);
            }
            if (!!html) {
                html.classList.add("overflow-hidden");
            }
        } else {
        // close it
            if (drawer) {
                drawer.removeAttribute("tabindex");
                drawer.classList.remove("is-active");
                drawer.removeEventListener( "click", this.handleMenuClick);
            }
            if (!!html) {
                setTimeout(() => {
                    html.classList.remove("overflow-hidden");
                },         300);
            }
        }
    }
}

function appendProtocol(location: string) {
    if (location.indexOf("http") === 0) {
        return location;
    }
    return `http://${location}`;
}