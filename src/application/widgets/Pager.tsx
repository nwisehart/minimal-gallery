import { jsxFactory } from "esri/widgets/support/widget";

interface IPagerProps {
    config: {
        [propName: string]: any
    };
    i18n: any;
    pointHandler: (pointer: number) => void;
    pointer: number;
    perPage: number;
    total: number;
}

export default (props: IPagerProps) => {
    const pageButtons = Array.apply(null, Array(Math.ceil(props.total / props.perPage))).map((v, i) => {
        const isActive = props.pointer < ((i + 1) * props.perPage) && props.pointer >= (i * props.perPage);
        return {
            render: () => (
                <a
                    id={`page-${i + 1}`}
                    title={`page-${i + 1}`}
                    class={`btn ${isActive ? null : "btn-transparent"}`}
                    onclick={isActive ? null : handlePage}
                    role="link"
                    tabindex="0"
                    style={`
                        color: ${isActive ? props.config.buttonTextColor : props.config.buttonBgColor};
                        background-color: ${isActive ? props.config.buttonBgColor : null};
                        border: ${isActive ? `1px solid ${props.config.buttonBgColor}` : "none"};
                    `}
                >
                    {i + 1}
                </a>
            )
        };

        function handlePage() {
            props.pointHandler(i * props.perPage);
        }
    });

    return {
        render() {
            if (pageButtons.length === 0) {
                return (
                        <h3 class="center-style">{props.i18n.pager.noResults}</h3>
                );
            } else if (pageButtons.length === 1) {
                return null;
            }
            return (
                <div class="text-center trailer-1 leader-1" key="pager">
                    <a
                        id="previous"
                        title="previous"
                        class={`btn btn-transparent ${props.pointer <= 0 ? "btn-disabled" : null}`}
                        onclick={handlePrevious}
                        role="link"
                        tabindex="0"
                        style={`color:${props.config.buttonBgColor};`}
                    >
                        Previous
                    </a>
                    {pageButtons.map((item) => item.render())}
                    <a
                        id="next"
                        title="next"
                        class={`btn btn-transparent btn-arrow ${props.total - props.pointer <= props.perPage ? "btn-disabled" : null}`}
                        onclick={handleNext}
                        role="link"
                        tabindex="0"
                        style={`color:${props.config.buttonBgColor};`}
                    >
                        Next
                    </a>
                </div>
            );
        }
    };

    function handlePrevious() {
        props.pointHandler(props.pointer - props.perPage);
    }

    function handleNext() {
        props.pointHandler(props.pointer + props.perPage);
    }
};
