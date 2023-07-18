<script lang="ts">
    export let user: User;

    const plan_name = {
        1: "Free",
        2: "Basic"
    }
</script>

<div class="row">
    <div class="col">
        <h5>{user.email}</h5>
    </div>
    <div class="col">
        <div class="row row-cols-auto">
            <h5>Usable credits left: {user.credits_usable}</h5>
            <h5>Current Plan: {plan_name[user.plan_id]}</h5>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button class="btn btn-primary">Buy more credits</button>
                {#if user.plan_id == 1}
                    <button class="btn btn-primary">Upgrade plan</button>
                {/if}
            </div>
        </div>
    </div>
</div>

