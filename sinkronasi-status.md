BEGIN Module_Tracking_Sync_Status
    // INPUT: Membaca hasil keputusan dari LocalStorage yang dikirim oleh validator
    LOAD validator_vote_result FROM LocalStorage ("shieldchain_vote_result")

    // PROCESS & OUTPUT: Perbarui teks Public Tracker secara real-time
    IF validator_vote_result IS NOT EMPTY THEN
        SET final_status_text = "Hasil Voting Komunitas: " + UPPERCASE(validator_vote_result)
        UPDATE element "tracker-status-text" TEXT TO final_status_text
        
        IF validator_vote_result == "Aman" THEN
            SET status_color_code = "#34d399"
        ELSE
            SET status_color_code = "#ff003c"
        END IF

        APPEND_LOG_TERMINAL " [ON-CHAIN] Konsensus Selesai: " + validator_vote_result WITH status_color_code
    ELSE
        UPDATE element "tracker-status-text" TEXT TO "Sedang dalam antrean validasi komunitas"
    END IF

    // FINITENESS & EFFECTIVENESS: Berhenti setelah sinkronisasi layar selesai
    TERMINATE
END Module_Tracking_Sync_Status