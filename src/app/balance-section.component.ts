import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  selector: 'bob-balance-section',
  template: ` <section class="px-24 py-32 bg-white bg-opacity-5">
    <p class="text-center text-3xl">Balance</p>
    @if (account()) {
      <div class="flex justify-center items-center gap-2 mb-2">
        <img [src]="account()?.info?.image" class="w-8 h-8" />
        <p class="text-2xl font-bold">{{ account()?.balance | number }}</p>
      </div>

      <mat-card class="w-[500px] justify-center items-center mx-auto">
        <table
          mat-table
          [dataSource]="transactions() ?? []"
          class="mat-elevation-z8"
        >
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef>Type</th>
            <td mat-cell *matCellDef="let tx">{{ tx.type }}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let tx">{{ tx.status }}</td>
          </ng-container>

          <ng-container matColumnDef="timestamp">
            <th mat-header-cell *matHeaderCellDef>Timestamp</th>
            <td mat-cell *matCellDef="let tx">{{ tx.timestamp }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card>
    } @else {
      <p class="text-center text-3xl">* **.****</p>
      <p class="text-center text-3xl">No transactions.</p>
    }
  </section>`,
  standalone: true,
  imports: [DecimalPipe, MatTableModule, MatCard],
})
export class BalanceSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(() =>
    this._shyftApiService.getAccout(this._publicKey()?.toBase58()),
  );
  readonly transactions = computedAsync(() =>
    this._shyftApiService.getTransactions(this._publicKey()?.toBase58()),
  );

  displayedColumns: string[] = ['type', 'status', 'timestamp'];
}
