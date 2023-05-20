package com.unicv.unidule.domain;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(name = "departament")
public class Departament implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private static final String SEQ_GENERATOR = "departament_id_seq_gen";
    private static final String SEQ_NAME = "departament_id_seq";

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQ_GENERATOR)
    @SequenceGenerator(name = SEQ_GENERATOR, sequenceName = SEQ_NAME, allocationSize = 1)
    private Long id;
}
