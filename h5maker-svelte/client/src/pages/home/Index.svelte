<script>
    import { onMount } from 'svelte';
    import Modal from '@components/modal'
    import SvgIcon from '@components/svg-icons';
    import addPageSvg from '@components/svg-icons/addPage.svg';
    import moment from 'moment';
    import { getUuid } from '@src/helper';
    import db from '@src/db';
    

    // 打开新建弹窗
    let open = false;
    let formData = {
        title: '',
    };
    function submitForm() {
        formData.sid = getUuid();
        formData.create_time = Date.now();
        formData.creator = '';
        formData.status = '下线';
        formData.url_online = '';
        addPage();
    }
    async function addPage() {
        try {
            // 新建页面!
            const id = await db.pages.add(formData);
            // Reset form:
            formData = {
                title: '',
            };
            items = getPages();
        } catch (error) {
            alert(`Failed to add ${friendName}: ${error}`);
        }
        open = false;
    }
    // 搜索关键字
    let searchKey = '';
    // 搜索框按下回车事件
    function handleKeyDown(ent) {
        if (ent.key === 'Enter') {
            doSearch();
        }
    }
    // 实际搜索操作
    async function doSearch() {
        console.log(searchKey);
        if (searchKey) {
            items = await db.pages
                .where('title')
                .equals(searchKey)
                .offset(0)
                .limit(10)
                .reverse()
                .toArray();
        } else {
            items = await db.pages.offset(0).limit(10).reverse().toArray();
        }
    }

    // 页面列表
    async function getPages() {
        return await db.pages.offset(0).limit(10).reverse().toArray();
    }

    $: items = [];
    let total = (items && items.length) || 0;
    let rowsPerPage = 10;
    let currentPage = 0;
    $: start = currentPage * rowsPerPage;
    $: end = Math.min(start + rowsPerPage, items.length);
    $: lastPage = Math.max(Math.ceil(total / rowsPerPage) - 1, 0);

    $: if (currentPage > lastPage) {
        currentPage = lastPage;
    }

    onMount(async () => {
        items = await db.pages.offset(0).limit(10).reverse().toArray();
        console.log(items);

        console.log('the component has mounted');
    });
</script>

<div class="page-container" style="padding: 16px;">
    <div class="tool-bar" style="margin-bottom:16px;">
        <a
            class="alink"
            style="margin-left: 4px;"
            href="#;"
            on:click={() => (open = true)}
        >
            <SvgIcon type="AddPage" size="18px" />
            <span style="margin-left: 4px;">新建页面</span>
        </a>
        <div class="searh-container solo-paper">
            <!-- <Icon class="material-icons">search</Icon>
            <Input
                bind:value={searchKey}
                on:keydown={handleKeyDown}
                placeholder="搜索"
                class="solo-input"
            /> -->
        </div>
    </div>
    {#if items && items.length}
        <table style="width: 100%;">
            <!-- <Head>
                <Row>
                    <Cell>ID</Cell>
                    <Cell>UUID</Cell>
                    <Cell style="width: 200px;">标题</Cell>
                    <Cell>状态</Cell>
                    <Cell style="width: 175px;">创建时间</Cell>
                    <Cell>创建人</Cell>
                    <Cell style="width: 160px;">操作</Cell>
                </Row>
            </Head>
            <Body>
                {#each items as item (item.id)}
                    <Row>
                        <Cell>{item.id}</Cell>
                        <Cell><div class="txt-over">{item.sid}</div></Cell>
                        <Cell>{item.title}</Cell>
                        <Cell>{item.status}</Cell>
                        <Cell>
                            {moment(item.create_time).format(
                                'YYYY年M月d日 h:mm:ss'
                            )}
                        </Cell>
                        <Cell>{item.creator ? item.creator : '匿名'}</Cell>
                        <Cell>
                            <div
                                style="display: flex; align-items: center;justify-content:space-between;"
                            >
                                <a class="abutton" href="#;">下载</a>
                                <a
                                    class="abutton"
                                    href="/assemble?sid={item.sid}"
                                    target="_self">编辑</a
                                >
                                <a
                                    class="abutton"
                                    href="/preview"
                                    target="_self">删除</a
                                >
                            </div>
                        </Cell>
                    </Row>
                {/each}
            </Body>

            <Pagination slot="paginate">
                <svelte:fragment slot="rowsPerPage">
                    <Label>Rows Per Page</Label>
                    <Select variant="outlined" bind:value={rowsPerPage} noLabel>
                        <Option value={10}>10</Option>
                        <Option value={25}>25</Option>
                        <Option value={100}>100</Option>
                    </Select>
                </svelte:fragment>
                <svelte:fragment slot="total">
                    {start + 1}-{end} of {items.length}
                </svelte:fragment>

                <IconButton
                    class="material-icons"
                    action="first-page"
                    title="First page"
                    on:click={() => (currentPage = 0)}
                    disabled={currentPage === 0}>first_page</IconButton
                >
                <IconButton
                    class="material-icons"
                    action="prev-page"
                    title="Prev page"
                    on:click={() => currentPage--}
                    disabled={currentPage === 0}>chevron_left</IconButton
                >
                <IconButton
                    class="material-icons"
                    action="next-page"
                    title="Next page"
                    on:click={() => currentPage++}
                    disabled={currentPage === lastPage}
                    >chevron_right</IconButton
                >
                <IconButton
                    class="material-icons"
                    action="last-page"
                    title="Last page"
                    on:click={() => (currentPage = lastPage)}
                    disabled={currentPage === lastPage}>last_page</IconButton
                >
            </Pagination> -->
        </table>
    {:else}
        <div class="table-none">
            <div>当前没有页面，</div>
            <div
                style="display: flex; align-items: center;margin-left: 4px;"
                on:click={() => (open = true)}
            >
                <span class="onep-icon" style="margin-right: 9px;">
                    <SvgIcon
                        data={addPageSvg}
                        width="18px"
                        height="18px"
                    />
                </span>
                <span>新建页面</span>
            </div>
        </div>
    {/if}
</div>

<Modal
    bind:open
    scrimClickAction=""
    escapeKeyAction=""
    aria-labelledby="fullscreen-title"
    aria-describedby="fullscreen-content"
>
    <div id="mandatory-title">新建页面</div>
        
</Modal>

<style>
    * :global(a.abutton) {
        outline: none;
        text-decoration: none;
    }
    * :global(.searh-container) {
        display: flex;
        align-items: center;
        border: 1px solid
            var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
        border-radius: 4px;
        padding: 4px;
    }
    * :global(.solo-paper) {
        display: flex;
        align-items: center;
        flex-grow: 1;
        max-width: 300px;
        padding: 0 8px;
        height: 36px;
    }

    * :global(.solo-paper > *) {
        display: inline-block;
        margin: 0 12px;
    }
    * :global(.solo-input) {
        flex-grow: 1;
        color: var(--mdc-theme-on-surface, #000);
    }
    * :global(.solo-input::placeholder) {
        color: var(--mdc-theme-on-surface, #000);
        opacity: 0.6;
    }
    * :global(.solo-fab) {
        flex-shrink: 0;
    }
    * :global(.form-item-container) {
        padding: 0 16px;
    }
    * :global(.table-none) {
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 60px;
    }
    * :global(.txt-over) {
        display: inline-block;
        width: 120px;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
    }
</style>
