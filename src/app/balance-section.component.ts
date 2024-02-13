import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  selector: 'bob-balance-section',
  template: ` <section class="px-24 py-32 bg-white bg-opacity-5">
    <p class="text-center text-3xl">Balance</p>
    @if (account()) {
      <div class="mb-4 top-4 left-4 flex justify-center items-center gap-2">
        <img [src]="account()?.info?.image" class="w-8 h-8" />
        <p class="text-2xl font-bold">{{ account()?.balance | number }}</p>
      </div>
    } @else {
      <p class="text-center text-3xl">* **.****</p>
    }
  </section>`,
  standalone: true,
  imports: [DecimalPipe],
})
export class BalanceSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccout(this._publicKey()?.toBase58()),
    { requireSync: false },
  );
}
