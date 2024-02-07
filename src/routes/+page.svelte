<style lang="scss">
    $font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    main {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        overflow-x: hidden;
        .wrapper {
            z-index: 1;
            $border: 1px solid lightgray;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border: $border;
            border-radius: 0.75em;
            margin: 1em;
            overflow: hidden;
            max-width: 500px;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
            .search {
                box-sizing: border-box;
                border-bottom: $border; 
                padding: 0.75em;
                display: flex;
                align-items: center;
                width: 100%;
                margin-bottom: 0;
                .searchIcon {
                    $width: 1.5em;
                    height: $width;
                    width: $width;
                    -webkit-user-drag: none;
                    user-select: none;
                    -moz-user-select: none;
                    -webkit-user-select: none;
                    -ms-user-select: none;
                }
                .searchInput {
                    // padding: 0.5em;
                    border: none;
                    // border-bottom: 1px solid #000;
                    margin-left: 0.5em;
                    outline: none!important;
                    font-family: $font-family;
                    font-size: 1.5em;
                    width: 100%;
                    background: transparent;
                }
            }
            .suggestions {
                width: 100%;
                max-width: 500px;
                margin-top: 0;
                box-sizing: border-box;
                display: none;
                
                ul {
                    $selected-blue: #0d6efd;
                    color: white;
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    margin-top: 0;
                    li:nth-child(1) {
                        background: $selected-blue!important;
                        color: white;
                        &::after {
                            content: "";
                            margin-left: .5em;
                            background-image: url('/img/arrow-right-solid.svg');
                            filter: invert(1);
                            margin-right: 0.5em;
                            width: 1em;
                            height: 1em;
                            display: inline-block;
                            background-repeat: no-repeat;
                        }
                        &:hover {
                            background: $selected-blue!important;
                        }
                    }
                    li {
                        display: flex;
                        align-items: center;
                        padding: 0.5em;
                        cursor: pointer;
                        color: black;
                        transition: background 0.2s;
                        &:hover {
                            background: #fcfcfc;
                        }
                    }
                }
            
            }
        }
        .not-wrapper {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 0;
        }
    }

    @media (prefers-color-scheme: dark) {
        main {
            background: #222;
            .wrapper {
                border: 1px solid #333;
                .search {
                    .searchIcon {
                        filter: invert(1);
                    }
                    .searchInput {
                        color: #fff;
                    }
                }
            }
            .suggestions {
                ul li {
                    color: white!important;
                }
                ul li:hover {
                    background: #333!important;
                }
            }
        }
    }
</style>



<main>
    <div class="wrapper">
        <div class="search">
            <img draggable="false" class="searchIcon" src="/img/magnifying-glass-solid.svg" alt="Search" />
            <input on:mousedown={searchKeyDown} on:keydown={searchKeyDown} id="searchInput" class="searchInput" type="text" placeholder="Search" />
        </div>
        <div class="suggestions">
            <ul>
                <li>restaurants near me</li>
                <li>trending videos</li>
            </ul>
        </div>
    </div>

    <div class="not-wrapper" on:click={bodyClicked}></div>
</main>

<script lang="ts">
    const searchKeyDown = (e: KeyboardEvent) => {
        const suggestions = document.querySelector('.suggestions') as HTMLDivElement;
        if (e.key === 'Enter') {
            window.location.href="https://google.com/search?q=" + (document.getElementById('searchInput') as HTMLInputElement).value; // TODO change this
        } else {
            suggestions.style.display = 'block';
        }
    }

    const bodyClicked = (e: MouseEvent) => {
        const suggestions = document.querySelector('.suggestions') as HTMLDivElement;
        if (e.target !== suggestions) {
            suggestions.style.display = 'none';
        }
    }
</script>