package br.com.blue.prova.domain;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;


@Entity
@Table(name = "student")
public class Student implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private static final String SEQ_GENERATOR = "student_id_seq_gen";
    private static final String SEQ_NAME = "student_id_seq";

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQ_GENERATOR)
    @SequenceGenerator(name = SEQ_GENERATOR, sequenceName = SEQ_NAME, allocationSize = 1)
    private Long id;

}
