<script lang="ts">
    export let user;

    const plan_name = {
        1: "Free",
        2: "Basic",
        3: "Artist"
    }

</script>

<div class="row">
    <div class="col">
        <h5>{user.email}</h5>
    </div>
    <div class="col">
        <div class="row row-cols-auto">
            <h5>Usable credits left: <span class="badge bg-secondary">{user.usable_credits}</span></h5>
            <h5>Current Plan: {plan_name[user.plan_id]}</h5>
            <div class="btn-group" role="group" aria-label="Basic example">
                <a target="_blank" href="https://buy.stripe.com/test_5kA29W22n1A9dVKaEE?client_reference_id={user.id}&prefilled_email={user.email}" class="btn btn-primary" role="button">
                    Buy more credits
                </a>

                {#if user.plan_id == 1}
                    <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                        Upgrade plan
                    </button>

                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" target="_blank" href="https://buy.stripe.com/test_9AQ15SgXhfqZ5pecMO?client_reference_id={user.id}&prefilled_email={user.email}">Basic</a></li>
                        <li><a class="dropdown-item" target="_blank" href="https://buy.stripe.com/test_aEU4i44av4Ml8BqbIL?client_reference_id={user.id}&prefilled_email={user.email}">Artist</a></li>
                    </ul>
                    
                {/if}
            </div>
        </div>
    </div>
</div>

