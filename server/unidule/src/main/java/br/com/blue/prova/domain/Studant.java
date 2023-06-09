package br.com.blue.prova.domain;

import javax.persistence.*;
import java.io.Serial;

@Entity
@Table(name = "studant")
public class Studant {
    @Serial
    private static final long serialVersionUID = 1L;

    private static final String SEQ_GENERATOR = "studant_id_seq_gen";
    private static final String SEQ_NAME = "studant_id_seq";

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQ_GENERATOR)
    @SequenceGenerator(name = SEQ_GENERATOR, sequenceName = SEQ_NAME, allocationSize = 1)
    private Long id;
}
