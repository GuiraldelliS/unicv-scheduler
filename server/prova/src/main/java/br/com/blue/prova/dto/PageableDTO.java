package br.com.blue.prova.dto;

import io.leangen.graphql.annotations.types.GraphQLType;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Optional;

import static java.util.Objects.isNull;

@GraphQLType(name = "PageableDTO")
public class PageableDTO {
    private Integer pageNumber = 0;

    private Integer pageSize = 20;

    private String sortField;

    private Sort.Direction sortDir = Sort.Direction.ASC;

    public Optional<Integer> getPageNumber() {
        return Optional.ofNullable(pageNumber);
    }

    public void setPageNumber(Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

    public Optional<Integer> getPageSize() {
        return Optional.ofNullable(pageSize);
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Optional<String> getSortField() {
        return Optional.ofNullable(sortField);
    }

    public void setSortField(String sortField) {
        this.sortField = sortField;
    }

    public Optional<Sort.Direction> getSortDir() {
        return Optional.ofNullable(this.sortDir);
    }

    public void setSortDir(String sortDir) {
        this.sortDir = isNull(sortDir) ? null : Sort.Direction.fromString(sortDir);
    }

    public Sort getSort() {
        if (getSortDir().isPresent() && getSortField().isPresent()) {
            return Sort.by(getSortDir().get(), getSortField().get());
        }

        return Sort.unsorted();
    }

    public Pageable getPageable() {
        return PageRequest.of(pageNumber, pageSize, getSort());
    }
}
