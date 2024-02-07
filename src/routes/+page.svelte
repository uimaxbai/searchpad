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
                
                ul {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    margin-top: 0;
                    li:nth-child(1)::after {
                        content: " ->";
                        margin-right: 0.5em;
                    }
                    li {
                        padding: 0.5em;
                        cursor: pointer;
                        transition: background 0.2s;
                        &:hover {
                            background: #fcfcfc;
                        }
                    }
                }
            
            }
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
                color: white;
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
            <input class="searchInput" type="text" placeholder="Search" />
        </div>
        <div class="suggestions">
            <ul>
                <li>restaurants near me</li>
            </ul>
        </div>
    </div>
</main>

<script lang="ts">

</script>