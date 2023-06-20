<script lang="ts">
    import { getActions } from "../../api";
	import { onMount } from 'svelte';

    let actions: any[] = [];

    onMount(async () => {
        const res = await getActions();
        actions = await res.json();
    });
</script>

<section class="pricing">
    <div class="container">
        <div class="row">
            <h3>Pricing</h3>
        </div>
        <div class="row">
            <div class="col-lg">
                <div class="card mb-5 mb-lg-0">
                    <div class="card-body">
                        <h5 class="card-title">Free</h5>
                        <h6 class="card-title">$0 / month</h6>
                        <hr />
                        <ul>
                            <li>10 monthly credits</li>
                            <li>API access</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg">
                <div class="card mb-5 mb-lg-0">
                    <div class="card-body">
                        <h5 class="card-title">Basic</h5>
                        <h6 class="card-title">$5 / month</h6>
                        <hr />
                        <ul>
                            <li>50 monthly credits</li>
                            <li>API access</li>
                            <li>Access to TuneForge Radio</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <p>Additional credits are available for $10 / 100 credits</p>
            <p>Credits included in plan expire and refresh every month. Additional purchased credits never expire.</p>
        </div>
        <div class="row">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Action</th>
                        <th scope="col">Usage</th>
                    </tr>
                </thead>
                <tbody>
                    {#each actions as action}
                        <tr>
                            <td>{action.name}</td>
                            <td>{action.cost} credits / {action.length} seconds</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</section>
