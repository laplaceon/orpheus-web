<script lang="ts">
    import AccountHeader from "$lib/components/AccountHeader.svelte";
    import { getUserHistory } from "$lib/api";
	import { onMount } from 'svelte';
    import { user as userToken } from "$lib/auth";

    let history: HistoryItem[] = [];
    let user_id = 1;

    onMount(async () => {
        const res = await getUserHistory(user_id);
        history = await res.json();
    });

    let user = {
        id: 1,
        email: "adad@gmail.com",
        plan_id: 1,
        credits_usable: 12
    };

</script>

<AccountHeader {user} />

{$userToken.token}


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
                        </tr>
                    </thead>
                    <tbody>
                        {#each history as historyItem}
                            <tr>
                                <td>{historyItem.action_name}</td>
                                <td>{historyItem.created_at}</td>
                                <td>{historyItem.cost} credits</td>
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


  