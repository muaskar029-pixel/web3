BEGIN Module_Validator_Voting_And_Slashing
    // INPUT: Validator memilih opsi voting ("Aman" atau "Phishing")
    ON_CLICK "Vote Button" (vote_choice: Aman OR Phishing) DO
        // DEFINITENESS: Pastikan validator sudah melakukan staking
        IF is_validator_active == FALSE THEN
            OUTPUT "Error: Anda harus melakukan staking terlebih dahulu"
            TERMINATE
        END IF

        // PROCESS: Eksekusi smart contract on-chain (Simulasi transaksi)
        SET transaction_hash = "0x" + RANDOM_HEX(10)
        STORE vote_choice INTO LocalStorage AS "shieldchain_vote_result"

        // PROCESS: Evaluasi indikator Reward (Hijau) atau Slashing (Merah)
        IF vote_choice == "Phishing" THEN
            SET reward_status = "+0.05 ETH (Valid / Reward)"
            SET indicator_color = "Hijau"
        ELSE
            SET reward_status = "-0.10 ETH (Salah / Slashed)"
            SET indicator_color = "Merah"
        END IF

        // OUTPUT 1: Masukkan data ke tabel ledger dengan indikator warna
        APPEND_ROW_TO table "ledger-table-body" WITH ("#8892", vote_choice, transaction_hash, reward_status, indicator_color)

        // OUTPUT 2: Tampilkan notifikasi sukses dan ubah antrean menjadi selesai
        DISPLAY_TOAST "Vote Berhasil Dikirim ke Smart Contract On-Chain!"
        UPDATE_UI_QUEUE_COMPLETED()

        // FINITENESS: Hapus data penugasan sementara dari memori
        REMOVE LocalStorage ("shieldchain_pending_url")
    END ON_CLICK

    // EFFECTIVENESS: Proses berhenti dan menunggu tugas verifikasi berikutnya
    TERMINATE
END Module_Validator_Voting_And_Slashing