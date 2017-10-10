import Component from "../../Component";
import { MinimalGalleryState } from ".";
import { push } from "./_actions";

interface ComponentState {
    searchTerm: string;
}

export default class Header extends Component<MinimalGalleryState, ComponentState> {
    constructor(store: __Component.Store) {
        super(store);

        this.state = {
            searchTerm: this.props.filter
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    public render() {
        const tsx = this.tsx;
        const config = this.props.base.applicationBaseResult.config;

        const headSearch = config.headerSearch ? (
            <nav class="class-top-nav-list right" role="navigation" title="usernav">
                <form class="inline-block padding-leader-half" role="search" onsubmit={this.handleSearch}>
                    <input
                        title={config.searchPlaceholder}
                        type="search"
                        placeholder={config.searchPlaceholder}
                        name="q"
                        value={this.state.searchTerm}
                        style="margin-top: -1px;"
                        oninput={this.handleSearchChange}
                    />
                    <button type="submit" class="hide">{config.searchPlaceholder}</button>
                </form>
            </nav>
        ) : null;

        const tabletHeadSearch = config.headerSearch ? (
            <nav class="class-top-nav-list right" role="navigation" title="usernav">
                <form class="inline-block padding-leader-half" role="search" onsubmit={this.handleSearch}>
                    <input
                        title={config.searchPlaceholder}
                        type="search"
                        placeholder={config.searchPlaceholder}
                        name="q"
                        value={this.state.searchTerm}
                        style="margin-top: -1px;"
                        oninput={this.handleSearchChange}
                    />
                    <button type="submit" class="hide">{config.searchPlaceholder}</button>
                </form>
            </nav>
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
            >
                {config.agolLinkText}
            </a>
        ) : null;

        return (
            <header class="top-nav fade-in" style={`background-color: ${config.headColor}`}>
                <div class="grid-container">
                    <div class="column-24">
                        <div class="tablet-hide">
                            <a href={config.headerTextURL}>
                                {headImage}
                                <a class="top-nav-title" style={`color: ${config.headerTextColor}`}>
                                    {config.headerText}
                                </a>
                            </a>
                            {headSearch}
                            {agolLink}
                        </div>

                        <div class="tablet-show top-nav-flex">
                            <header class="top-nav-flex-title">
                                <a href={config.headerTextURL}>
                                    <a class="top-nav-title" style={`color: ${config.headerTextColor}`}>
                                        {config.headerText}
                                    </a>
                                </a>
                                {tabletHeadSearch}
                            </header>
                        </div>
                    </div>

                </div>
            </header>
        );
    }

    public componentWillReceiveProps(nextProps: MinimalGalleryState) {
        if (nextProps.filter !== this.state.searchTerm) {   // Set search term based on URL param
            this.setState({ searchTerm: nextProps.filter });
        }
    }

    private handleSearch(e: any) {
        e.preventDefault();
        const query = this.state.searchTerm.length > 0 ? `?q=${this.state.searchTerm}` : "?";
        this.dispatch(push(`${query}`));
    }

    private handleSearchChange(e: any) {
        this.setState({
            searchTerm: e.target.value
        });
    }
}

function appendProtocol(location: string) {
    if (location.indexOf("http") === 0) {
        return location;
    }
    return `http://${location}`;
}