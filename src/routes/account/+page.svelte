<script lang="ts">
    import AccountHeader from "$lib/components/AccountHeader.svelte";
    import { getUserHistory } from "$lib/api";
	import { onMount } from 'svelte';
    import { page } from "$app/stores";

    let user: User = {
        id: 0,
        email: "",
        verified: false
    };

    let history: HistoryItem[] = [];

    onMount(async () => {
        const res = await getUserHistory($page.data.user.user_id, $page.data.user.token);
        history = await res.json();

        user = {
            id: $page.data.user.user_id,
            email: "laplaceon@gmail.com",
            verified: true
        }
    });

</script>

<AccountHeader {user} />

<div class="row">
    <div class="d-flex align-items-start">
        <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button class="nav-link active" id="v-pills-history-tab" data-bs-toggle="pill" data-bs-target="#v-pills-history" type="button" role="tab" aria-controls="v-pills-history" aria-selected="true">Action History</button>
            <button class="nav-link" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="false">Purchase History</button>
        </div>
        <div class="tab-content" id="v-pills-tabContent">
            <div class="tab-pane fade show active" id="v-pills-history" role="tabpanel" aria-labelledby="v-pills-history-tab" tabindex="0">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Action</th>
                            <th scope="col">Time</th>
                            <th scope="col">Cost</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each history as historyItem}
                            <tr>
                                <td class="align-middle">{historyItem.action_name}</td>
                                <td class="align-middle">{historyItem.created_at}</td>
                                <td class="align-middle">{historyItem.cost} credits</td>
                                <td>
                                    <button class="btn btn-link">
                                        <a href="/account/history/{historyItem.id}">View</a>
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


  