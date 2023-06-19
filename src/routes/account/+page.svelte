<script>
    import { getUserHistory } from "../../api";
	import { onMount } from 'svelte';

    let history = [];
    let user_id = 1;

    onMount(async () => {
        const res = await getUserHistory(user_id);
        history = await res.json();
        console.log(history);
    });

</script>

<div class="row">
    <div class="d-flex align-items-start">
        <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">History</button>
            <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Settings</button>
        </div>
        <div class="tab-content" id="v-pills-tabContent">
            <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
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
                                <td>{historyItem.action_id}</td>
                                <td>{historyItem.created_at}</td>
                                <td>{historyItem.cost} credits</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
                Settings
            </div>
        </div>
    </div>
</div>


  