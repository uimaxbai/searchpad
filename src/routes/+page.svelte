<style lang="scss">
    $font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    main {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        overflow-x: hidden;
        flex-direction: column;
        padding: 1em;
        .logo {
            width: 100%;
            max-width: 400px;
        }
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
                    :global(li.selected) {
                        background: $selected-blue;
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
                    :global(li.selected a) {
                        color: white!important;
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
                        a {
                            color: black;
                            text-decoration: none;
                            width: 100%;
                            height: 100%;
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
            background: transparent;
            border: none;

        }
    }

    @media (prefers-color-scheme: dark) {
        
        main {
            background: #222;
            .wrapper {
                border: 1px solid #333;
                .search {
                    border-bottom: 1px solid #333;
                    .searchIcon {
                        filter: invert(1);
                    }
                    .searchInput {
                        color: #fff;
                    }
                }
            }
            .suggestions {
                li.selected {
                    background: #0c5cd3!important;
                }
                ul li a {
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
    <img src="/icons/main.png" alt="Searchpad Logo" loading="lazy" draggable="false" class="logo" />
    <div class="wrapper">
        <div class="search">
            <img draggable="false" class="searchIcon" src="/img/magnifying-glass-solid.svg" alt="Search" />
            <input on:mousedown={searchKeyDown} on:keyup={searchKeyDown} id="searchInput" class="searchInput" type="text" placeholder="Search" />
        </div>
        <div class="suggestions">
            <ul>
                {#each suggestionsArr as suggestion, i}
                    <li class="suggestion{i}"><a href={suggestion[1]}>{suggestion[0]}</a></li>
                {/each}
            </ul>
        </div>
    </div>

    <button class="not-wrapper" on:click={bodyClicked}></button>
</main>

<script lang="ts">
    import { onMount } from 'svelte';

    var currentlySelected = 0;
    var history: Array<Array<string>> = [];
    var websitesIndexed: {[key: string]: string} = {};
    let suggestionsArr: Array<Array<string>> = [];
    var searchLink = "https://google.com/search?q=";

    onMount(() => {
        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        searchInput.focus();
        // (document.querySelector('.suggestions') as HTMLDivElement).style.display = 'block';

        document.querySelector(`.suggestion${currentlySelected}`)?.classList.add('selected');

        if (localStorage.getItem("history") === null) {
            localStorage.setItem("history", JSON.stringify([]));
        }
        else {
            history = JSON.parse(localStorage.getItem("history") as string);
            // console.log(history);
        }
    });

    async function searchAutoComplete() {
        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        // const suggestions = document.querySelector('.suggestions') as HTMLDivElement;
        const res = await fetch(`/api/v1/autocomplete?q=${searchInput.value}`);
        const data = await res.json();
        // console.log(data);
        return data;
    }
    async function getTitleOfWebpage(site: string) {
        const res = await fetch(`/api/v1/getTitle?site=${site}`);
        const data = await res.json();
        return data;
    }

    const searchKeyDown = (e: KeyboardEvent | MouseEvent) => {
        const suggestions = document.querySelector('.suggestions') as HTMLDivElement;
        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        if ((e as KeyboardEvent).key === 'Enter') {
            // console.log(suggestionsArr);
            // TODO fix
            console.log(history);
            // console.log([suggestionsArr[currentlySelected][0], suggestionsArr[currentlySelected][1]]);
            .// console.log(history.includes([suggestionsArr[currentlySelected][0], suggestionsArr[currentlySelected][1]]));
            if (!history.includes([suggestionsArr[currentlySelected][0], suggestionsArr[currentlySelected][1]])) history.push([suggestionsArr[currentlySelected][0], suggestionsArr[currentlySelected][1]]);
            localStorage.setItem("history", JSON.stringify(history));
            /* if (suggestionsArr[currentlySelected].includes(" (website")) {
                var link = (suggestionsArr[currentlySelected]).match(/(?<=.*?\(website, ).*[^)]/)?.toString() || "";
                // console.log(link);
                window.location.href = link;
            }
            else {
                window.location.href = `https://google.com/search?q=${suggestionsArr[currentlySelected]}`; // TODO change
            } */
        } 
        else if ((e as KeyboardEvent).key === 'ArrowDown') {
            document.querySelector(`.suggestion${currentlySelected}`)?.classList.remove('selected');
            currentlySelected += 1;
            if (currentlySelected > suggestionsArr.length - 1) {
                currentlySelected = 0;
            }
            document.querySelector(`.suggestion${currentlySelected}`)?.classList.add('selected');
        }
        else if ((e as KeyboardEvent).key === 'ArrowUp') {
            document.querySelector(`.suggestion${currentlySelected}`)?.classList.remove('selected');
            currentlySelected -= 1;
            if (currentlySelected < 0) {
                currentlySelected = suggestionsArr.length - 1;
            }
            document.querySelector(`.suggestion${currentlySelected}`)?.classList.add('selected');
        }
        else {
            // Finally, we put results in
            searchAutoComplete().then((data) => {
                var suggestionLinks: Array<Array<string>> = []; 
                // Push data into suggestion array
                (data[1]).forEach((el: string) => {
                    suggestionLinks.push([el, searchLink + el]);
                });

                // console.log(suggestionLinks);
                suggestionsArr = suggestionLinks;

                history.forEach((el) => {
                    // console.log(el);
                    if (el[0].includes(searchInput.value)) {
                        suggestionsArr = ([el]).concat(suggestionsArr);
                    }
                });

                // Prevent results from getting too big
                if (suggestionsArr.length > 7) {
                    suggestionsArr = suggestionsArr.slice(0, 7);
                }

                if (suggestionsArr.length > 0) {
                    suggestions.style.display = 'block';
                }
                else {
                    suggestions.style.display = 'none';
                }

                // suggestionsArr = suggestionsArr;
                // console.log(suggestionsArr);
            });
        }
    }

    const bodyClicked = (e: MouseEvent) => {
        const suggestions = document.querySelector('.suggestions') as HTMLDivElement;
        if (e.target !== suggestions) {
            suggestions.style.display = 'none';
        }
    }
</script>